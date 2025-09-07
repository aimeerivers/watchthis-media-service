import type { Document, ObjectId } from "mongoose";
import mongoose from "mongoose";

export interface IMedia extends Document {
  id: string;
  url: string;
  normalizedUrl: string;
  platform: string;
  type: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  duration?: number;
  extractionStatus: 'pending' | 'completed' | 'failed';
  extractionError?: string;
  metadata: Record<string, unknown>;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new mongoose.Schema<IMedia>({
  url: {
    type: String,
    required: true,
    trim: true,
  },
  normalizedUrl: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  platform: {
    type: String,
    required: true,
    enum: ['youtube', 'generic'],
    default: 'generic',
  },
  type: {
    type: String,
    required: true,
    enum: ['video', 'article', 'audio', 'unknown'],
    default: 'unknown',
  },
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  thumbnail: {
    type: String,
    trim: true,
  },
  duration: {
    type: Number,
    min: 0,
  },
  extractionStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  extractionError: {
    type: String,
    trim: true,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  tags: [{
    type: String,
    trim: true,
  }],
}, {
  timestamps: true,
});

MediaSchema.virtual("id").get(function () {
  return this._id as ObjectId;
});

MediaSchema.set("toJSON", {
  virtuals: true,
});

// Indexes for performance
MediaSchema.index({ normalizedUrl: 1 });
MediaSchema.index({ platform: 1 });
MediaSchema.index({ type: 1 });
MediaSchema.index({ extractionStatus: 1 });
MediaSchema.index({ createdAt: -1 });
MediaSchema.index({ title: 'text', description: 'text' }); // Full-text search

const Media = mongoose.model("Media", MediaSchema);

export { Media };
