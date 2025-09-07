import appRootPath from "app-root-path";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import path from "path";

import packageJson from "../package.json" with { type: "json" };
import { mountApi } from "./api.js";

dotenv.config();

const mongoUrl = process.env.MONGO_URL ?? "mongodb://localhost:27017/media-service";
const mongoMediaService = `${mongoUrl}${process.env.NODE_ENV === "test" ? "-test" : ""}`;

mongoose
  .connect(mongoMediaService)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err: Error) => {
    console.log(err);
  });

const app = express();

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles for TailwindCSS
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'"],
      },
    },
  })
);

app.use(express.json()); // For parsing JSON bodies
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(appRootPath.path, "views"));
app.use(express.static(path.join(appRootPath.path, "public")));

mountApi("/api/v1", app);

app.get("/", (_req, res) => {
  res.render("welcome-page");
});

app.get("/health", (_req, res) => {
  res.json({ 
    status: "healthy", 
    service: packageJson.name, 
    version: packageJson.version,
    timestamp: new Date().toISOString()
  });
});

app.get("/ping", (_req, res) => {
  res.send(`${packageJson.name} ${packageJson.version}`);
});

export { app };
