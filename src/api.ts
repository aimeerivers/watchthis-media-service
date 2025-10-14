import type { Response } from "express";
import { Express } from "express";

import { prisma } from "./app.js";
import { type RequestWithUser, requireAuth } from "./middleware/auth.js";
import { Media } from "./models/media.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import { detectPlatform, normalizeUrl, validateUrl } from "./utils/urlProcessor.js";

export function mountApi(mountRoute: string, app: Express): void {
  // Health check endpoint
  app.get(mountRoute + "/status", (_req, res) => {
    res.json({ status: "OK", message: "API is running" });
  });

  // Extract metadata without storing (for preview) - MUST be before /:id route
  app.get(
    mountRoute + "/media/extract",
    requireAuth,
    asyncHandler(async (req: RequestWithUser, res: Response) => {
      const { url } = req.query;

      if (!url || typeof url !== "string") {
        return res.status(400).json({ error: { message: "URL parameter is required" } });
      }

      // Validate URL
      const validation = validateUrl(url);
      if (!validation.isValid) {
        return res.status(400).json({ error: { message: validation.error } });
      }

      try {
        const normalizedUrl = normalizeUrl(url);
        const platform = detectPlatform(url);

        // For now, return basic extraction info
        // TODO: Implement actual metadata extraction
        const extraction = {
          url,
          normalizedUrl,
          platform,
          type: "unknown",
          title: null,
          description: null,
          thumbnail: null,
          duration: null,
          extractionStatus: "pending",
          message: "Metadata extraction not yet implemented",
        };

        res.json(extraction);
      } catch (error) {
        throw error;
      }
    })
  );

  // Search media - MUST be before /:id route
  app.get(
    mountRoute + "/media/search",
    requireAuth,
    asyncHandler(async (req: RequestWithUser, res: Response) => {
      const { q, platform, type } = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
      const skip = (page - 1) * limit;

      const filters: Record<string, unknown> = {};

      // Add platform filter
      if (platform) {
        filters.platform = platform;
      }

      // Add type filter
      if (type) {
        filters.type = type;
      }

      let media;
      let total;

      if (q && typeof q === "string") {
        // Use text search method for queries
        [media, total] = await Promise.all([
          Media.search(q, filters, { skip, limit }),
          prisma.media.count({
            where: {
              ...filters,
              OR: [
                {
                  title: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
              ],
            },
          }),
        ]);
      } else {
        // Regular filtering without search
        [media, total] = await Promise.all([
          prisma.media.findMany({
            where: filters,
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
          }),
          Media.countDocuments(filters),
        ]);
      }

      const totalPages = Math.ceil(total / limit);

      res.json({
        media,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
        query: { q, platform, type },
      });
    })
  );

  // Create new media item
  app.post(
    mountRoute + "/media",
    requireAuth,
    asyncHandler(async (req: RequestWithUser, res: Response) => {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({ error: { message: "URL is required" } });
      }

      // Validate URL
      const validation = validateUrl(url);
      if (!validation.isValid) {
        return res.status(400).json({ error: { message: validation.error } });
      }

      try {
        const normalizedUrl = normalizeUrl(url);
        const platform = detectPlatform(url);

        // Check if media already exists
        const existingMedia = await Media.findOne({ normalizedUrl });
        if (existingMedia) {
          return res.status(200).json(existingMedia);
        }

        const media = await Media.create({
          url,
          normalizedUrl,
          platform,
          type: "unknown", // Will be determined during extraction
          extractionStatus: "pending",
        });

        res.status(201).json(media);
      } catch (error) {
        throw error;
      }
    })
  );

  // Get media by ID
  app.get(
    mountRoute + "/media/:id",
    requireAuth,
    asyncHandler(async (req: RequestWithUser, res: Response) => {
      const { id } = req.params;

      const media = await Media.findById(id);
      if (!media) {
        return res.status(404).json({ error: { message: "Media not found" } });
      }

      res.json(media);
    })
  );

  // List media with pagination
  app.get(
    mountRoute + "/media",
    requireAuth,
    asyncHandler(async (req: RequestWithUser, res: Response) => {
      const page = parseInt(req.query.page as string) || 1;
      const limit = Math.min(parseInt(req.query.limit as string) || 20, 100); // Max 100 items
      const skip = (page - 1) * limit;

      const filter: Record<string, unknown> = {};

      // Filter by platform
      if (req.query.platform) {
        filter.platform = req.query.platform;
      }

      // Filter by type
      if (req.query.type) {
        filter.type = req.query.type;
      }

      // Filter by extraction status
      if (req.query.status) {
        filter.extractionStatus = req.query.status;
      }

      const [media, total] = await Promise.all([
        prisma.media.findMany({
          where: filter,
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
        Media.countDocuments(filter),
      ]);

      const totalPages = Math.ceil(total / limit);

      res.json({
        media,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      });
    })
  );
}
