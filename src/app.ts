import { PrismaClient } from "@prisma/client";
import appRootPath from "app-root-path";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import path from "path";

import packageJson from "../package.json" with { type: "json" };
import { mountApi } from "./api.js";
import { authenticateJWT } from "./middleware/auth.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv.config({ path: envFile });

// Initialize Prisma client
export const prisma = new PrismaClient();

// Connect to database
try {
  await prisma.$connect();
  console.log("Database connected!");
} catch (err: unknown) {
  console.error("Database connection failed:", err);
  process.exit(1);
}

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

// JWT authentication middleware (optional - adds user to req.user if valid token present)
app.use(authenticateJWT);

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
    timestamp: new Date().toISOString(),
  });
});

app.get("/ping", (_req, res) => {
  res.send(`${packageJson.name} ${packageJson.version}`);
});

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
