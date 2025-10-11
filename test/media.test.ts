import assert from "node:assert";
import type { Server } from "node:http";
import { after, before, beforeEach, describe, it } from "node:test";

import mongoose from "mongoose";
import request from "supertest";

import { app } from "../src/app.js";
import { Media } from "../src/models/media.js";
import { authenticateAs, clearUserServiceMocks, testUsers } from "./helpers/auth.js";
import { generateInvalidUrl, generateValidUrl, generateYouTubeUrl } from "./helpers/testData.js";

const port = 18584;
let server: Server;

describe("Media Service App", () => {
  before(async () => {
    // Ensure mongoose is connected before starting tests
    if (mongoose.connection.readyState !== 1) {
      await new Promise((resolve) => {
        mongoose.connection.once("open", resolve);
        if (mongoose.connection.readyState === 1) resolve(undefined);
      });
    }

    server = app.listen(port);
    // Clear test database
    await Media.deleteMany({});
  });

  beforeEach(() => {
    // Clear all HTTP mocks before each test
    clearUserServiceMocks();
  });

  after(async () => {
    try {
      // Clear all HTTP mocks
      clearUserServiceMocks();

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
      console.error("Error during cleanup:", error);
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
      const auth = authenticateAs(testUsers.user1);
      const url = generateValidUrl();
      const res = await request(app)
        .post("/api/v1/media")
        .set("Authorization", auth.authHeader)
        .send({ url })
        .expect(201);

      assert.ok(res.body.id);
      assert.equal(res.body.url, url);
      assert.equal(res.body.platform, "generic");
      assert.equal(res.body.extractionStatus, "pending");
    });

    it("should detect YouTube platform", async () => {
      const auth = authenticateAs(testUsers.user1);
      const url = generateYouTubeUrl();
      const res = await request(app)
        .post("/api/v1/media")
        .set("Authorization", auth.authHeader)
        .send({ url })
        .expect(201);

      assert.equal(res.body.platform, "youtube");
    });

    it("should reject invalid URLs", async () => {
      const auth = authenticateAs(testUsers.user1);
      const url = generateInvalidUrl();
      const res = await request(app)
        .post("/api/v1/media")
        .set("Authorization", auth.authHeader)
        .send({ url })
        .expect(400);

      assert.ok(res.body.error);
    });

    it("should return existing media when URL already exists", async () => {
      const auth = authenticateAs(testUsers.user1);
      const url = generateValidUrl();

      // First request creates the media item
      const firstRes = await request(app)
        .post("/api/v1/media")
        .set("Authorization", auth.authHeader)
        .send({ url })
        .expect(201);

      // Second request with same URL should return the existing item with 200 OK
      const secondRes = await request(app)
        .post("/api/v1/media")
        .set("Authorization", auth.authHeader)
        .send({ url })
        .expect(200);

      // Should return the same media item (same ID)
      assert.equal(secondRes.body.id, firstRes.body.id);
      assert.equal(secondRes.body.url, url);
      assert.equal(secondRes.body.platform, firstRes.body.platform);

      // Should not have any error fields
      assert.equal(secondRes.body.error, undefined);
    });

    it("should get media by ID", async () => {
      const auth = authenticateAs(testUsers.user1);
      const url = generateValidUrl();
      const createRes = await request(app)
        .post("/api/v1/media")
        .set("Authorization", auth.authHeader)
        .send({ url })
        .expect(201);

      const res = await request(app)
        .get(`/api/v1/media/${createRes.body.id}`)
        .set("Authorization", auth.authHeader)
        .expect(200);

      assert.equal(res.body.id, createRes.body.id);
      assert.equal(res.body.url, url);
    });

    it("should list media with pagination", async () => {
      const auth = authenticateAs(testUsers.user1);
      const res = await request(app).get("/api/v1/media?limit=10").set("Authorization", auth.authHeader).expect(200);

      assert.ok(res.body.media);
      assert.ok(res.body.pagination);
    });
  });

  describe("URL Processing", () => {
    it("should provide extraction preview", async () => {
      const auth = authenticateAs(testUsers.user1);
      const url = generateValidUrl();
      const res = await request(app)
        .get("/api/v1/media/extract")
        .set("Authorization", auth.authHeader)
        .query({ url })
        .expect(200);

      assert.equal(res.body.url, url);
      assert.ok(res.body.normalizedUrl);
      assert.ok(res.body.platform);
    });

    it("should fail extraction preview when not authenticated", async () => {
      const url = generateValidUrl();
      const res = await request(app).get("/api/v1/media/extract").query({ url }).expect(401);

      assert.equal(res.body.success, false);
      assert.equal(res.body.error.code, "AUTHENTICATION_REQUIRED");
    });
  });

  describe("Authentication Requirements", () => {
    it("should fail to create media when not authenticated", async () => {
      const url = generateValidUrl();
      const res = await request(app).post("/api/v1/media").send({ url }).expect(401);

      assert.equal(res.body.success, false);
      assert.equal(res.body.error.code, "AUTHENTICATION_REQUIRED");
    });

    it("should fail to get media by ID when not authenticated", async () => {
      // First create a media item with auth
      const auth = authenticateAs(testUsers.user1);
      const url = generateValidUrl();
      const createRes = await request(app)
        .post("/api/v1/media")
        .set("Authorization", auth.authHeader)
        .send({ url })
        .expect(201);

      // Clear mocks to simulate unauthenticated request
      clearUserServiceMocks();

      // Try to get the media without auth
      const res = await request(app).get(`/api/v1/media/${createRes.body.id}`).expect(401);

      assert.equal(res.body.success, false);
      assert.equal(res.body.error.code, "AUTHENTICATION_REQUIRED");
    });

    it("should fail to list media when not authenticated", async () => {
      const res = await request(app).get("/api/v1/media").expect(401);

      assert.equal(res.body.success, false);
      assert.equal(res.body.error.code, "AUTHENTICATION_REQUIRED");
    });

    it("should fail to search media when not authenticated", async () => {
      const res = await request(app).get("/api/v1/media/search?q=test").expect(401);

      assert.equal(res.body.success, false);
      assert.equal(res.body.error.code, "AUTHENTICATION_REQUIRED");
    });

    it("should allow access to status endpoint without authentication", async () => {
      const res = await request(app).get("/api/v1/status").expect(200);

      assert.equal(res.body.status, "OK");
      assert.equal(res.body.message, "API is running");
    });

    it("should fail to update media when not authenticated", async () => {
      // First create a media item with auth
      const auth = authenticateAs(testUsers.user1);
      const url = generateValidUrl();
      const createRes = await request(app)
        .post("/api/v1/media")
        .set("Authorization", auth.authHeader)
        .send({ url })
        .expect(201);

      // Clear mocks to simulate unauthenticated request
      clearUserServiceMocks();

      // Try to update the media without auth
      const res = await request(app)
        .patch(`/api/v1/media/${createRes.body.id}`)
        .send({ title: "Updated title" })
        .expect(401);

      assert.equal(res.body.success, false);
      assert.equal(res.body.error.code, "AUTHENTICATION_REQUIRED");
    });

    it("should fail to delete media when not authenticated", async () => {
      // First create a media item with auth
      const auth = authenticateAs(testUsers.user1);
      const url = generateValidUrl();
      const createRes = await request(app)
        .post("/api/v1/media")
        .set("Authorization", auth.authHeader)
        .send({ url })
        .expect(201);

      // Clear mocks to simulate unauthenticated request
      clearUserServiceMocks();

      // Try to delete the media without auth
      const res = await request(app).delete(`/api/v1/media/${createRes.body.id}`).expect(401);

      assert.equal(res.body.success, false);
      assert.equal(res.body.error.code, "AUTHENTICATION_REQUIRED");
    });

    it("should handle invalid JWT token gracefully", async () => {
      const url = generateValidUrl();
      const res = await request(app)
        .post("/api/v1/media")
        .set("Authorization", "Bearer invalid-token")
        .send({ url })
        .expect(401);

      assert.equal(res.body.success, false);
      assert.equal(res.body.error.code, "AUTHENTICATION_REQUIRED");
    });
  });
});
