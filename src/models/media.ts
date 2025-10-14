import { type Media as PrismaMedia, type Prisma } from "@prisma/client";

import { prisma } from "../app.js";

export interface IMedia {
  id: string;
  url: string;
  normalizedUrl: string;
  platform: string;
  type: string;
  title?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  duration?: number | null;
  extractionStatus: "pending" | "completed" | "failed";
  extractionError?: string | null;
  metadata: Record<string, unknown>;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class Media {
  static async findById(id: string): Promise<PrismaMedia | null> {
    return await prisma.media.findUnique({
      where: { id },
    });
  }

  static async findOne(where: Prisma.MediaWhereInput): Promise<PrismaMedia | null> {
    return await prisma.media.findFirst({
      where,
    });
  }

  static async find(where?: Prisma.MediaWhereInput): Promise<PrismaMedia[]> {
    return await prisma.media.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  static async create(data: Prisma.MediaCreateInput): Promise<PrismaMedia> {
    return await prisma.media.create({
      data,
    });
  }

  static async findByIdAndDelete(id: string): Promise<PrismaMedia | null> {
    try {
      return await prisma.media.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "P2025") {
        return null; // Record not found
      }
      throw error;
    }
  }

  static async deleteMany(where?: Prisma.MediaWhereInput): Promise<{ count: number }> {
    return await prisma.media.deleteMany({
      where,
    });
  }

  static async countDocuments(where?: Prisma.MediaWhereInput): Promise<number> {
    return await prisma.media.count({
      where,
    });
  }

  static async updateById(id: string, data: Prisma.MediaUpdateInput): Promise<PrismaMedia | null> {
    try {
      return await prisma.media.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "P2025") {
        return null; // Record not found
      }
      throw error;
    }
  }

  // Method to search media with text search (title and description)
  static async search(
    query: string,
    filters?: {
      platform?: string;
      type?: string;
      extractionStatus?: string;
    },
    pagination?: {
      skip: number;
      limit: number;
    }
  ): Promise<PrismaMedia[]> {
    const where: Prisma.MediaWhereInput = {
      ...filters,
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    };

    return await prisma.media.findMany({
      where,
      orderBy: { createdAt: "desc" },
      ...(pagination && {
        skip: pagination.skip,
        take: pagination.limit,
      }),
    });
  }
}
