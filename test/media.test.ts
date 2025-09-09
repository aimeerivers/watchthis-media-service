import assert from "node:assert";
import type { Server } from "node:http";
import { after, before, describe, it } from "node:test";

import mongoose from "mongoose";
import request from "supertest";

import { app } from "../src/app.js";
import { Media } from "../src/models/media.js";
import { generateInvalidUrl, generateValidUrl, generateYouTubeUrl } from "./helpers/testData.js";

const port = 18584;
let server: Server;

describe("Media Service App", () => {
  before(async () => {
    // Ensure mongoose is connected before starting tests
    if (mongoose.connection.readyState !== 1) {
      await new Promise((resolve) => {
        mongoose.connection.once('open', resolve);
        if (mongoose.connection.readyState === 1) resolve(undefined);
      });
    }
    
    server = app.listen(port);
    // Clear test database
    await Media.deleteMany({});
  });

  after(async () => {
    try {
      // Clean up test data
      await Media.deleteMany({});
      
      // Close server properly
      await new Promise<void>((resolve, reject) => {
        server.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      
      // Close mongoose connection last
      await mongoose.connection.close();
    } catch (error) {
      console.error('Error during cleanup:', error);
      throw error;
    }
  });

  describe("Health Endpoints", () => {
    it("should respond to ping", async () => {
      const res = await request(app).get("/ping");
      assert.equal(res.statusCode, 200);
      assert.ok(res.text.includes("watchthis-media-service"));
    });

    it("should respond to health check", async () => {
      const res = await request(app).get("/health");
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.status, "healthy");
      assert.equal(res.body.service, "watchthis-media-service");
    });

    it("should respond to API status", async () => {
      const res = await request(app).get("/api/v1/status");
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.status, "OK");
    });
  });

  describe("Media CRUD Operations", () => {
    it("should create a new media item", async () => {
      const url = generateValidUrl();
      const res = await request(app).post("/api/v1/media").send({ url }).expect(201);

      assert.ok(res.body.id);
      assert.equal(res.body.url, url);
      assert.equal(res.body.platform, "generic");
      assert.equal(res.body.extractionStatus, "pending");
    });

    it("should detect YouTube platform", async () => {
      const url = generateYouTubeUrl();
      const res = await request(app).post("/api/v1/media").send({ url }).expect(201);

      assert.equal(res.body.platform, "youtube");
    });

    it("should reject invalid URLs", async () => {
      const url = generateInvalidUrl();
      const res = await request(app).post("/api/v1/media").send({ url }).expect(400);

      assert.ok(res.body.error);
    });

    it("should get media by ID", async () => {
      const url = generateValidUrl();
      const createRes = await request(app).post("/api/v1/media").send({ url }).expect(201);

      const res = await request(app).get(`/api/v1/media/${createRes.body.id}`).expect(200);

      assert.equal(res.body.id, createRes.body.id);
      assert.equal(res.body.url, url);
    });

    it("should list media with pagination", async () => {
      const res = await request(app).get("/api/v1/media?limit=10").expect(200);

      assert.ok(res.body.media);
      assert.ok(res.body.pagination);
    });
  });

  describe("URL Processing", () => {
    it("should provide extraction preview", async () => {
      const url = generateValidUrl();
      const res = await request(app).get("/api/v1/media/extract").query({ url }).expect(200);

      assert.equal(res.body.url, url);
      assert.ok(res.body.normalizedUrl);
      assert.ok(res.body.platform);
    });
  });
});
