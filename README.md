# WatchThis Media Service

Media management service for the WatchThis platform. Handles media URLs, metadata extraction, and content management.

## 🚀 Status: Phase 1 Complete!

✅ **Core CRUD operations implemented**  
✅ **MongoDB integration with full schema**  
✅ **URL validation and normalization**  
✅ **Platform detection (YouTube, generic)**  
✅ **Search and filtering APIs**  
✅ **Comprehensive test suite**

## Overview

The watchthis-media-service is responsible for:

- ✅ Storing media URLs in a centralized repository (YouTube videos, articles, music, etc.)
- 🚧 Automatically extracting metadata from media URLs via queue processing (Phase 2)
- ✅ Providing media search and filtering capabilities
- ✅ Validating and categorizing media content
- 🚧 Generating preview images and summaries (Phase 2)

**Note**: This service acts as a **read-only repository** for known media links. Once added, media items cannot be edited or deleted through the API, ensuring data integrity and consistency.

This service is part of the WatchThis microservice ecosystem and integrates with:

- **watchthis-user-service**: For user authentication and authorization
- **watchthis-sharing-service**: For sharing media between users
- **watchthis-inbox-service**: For organizing shared content

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB running locally
- Git

### Installation

```bash
git clone <repository-url>
cd watchthis-media-service
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm run dev
```

### Test the API

```bash
# Health check
curl http://localhost:7769/health

# Add a media item to the repository
curl -X POST http://localhost:7769/api/v1/media \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'

# List media repository
curl http://localhost:7769/api/v1/media

# Search media repository
curl "http://localhost:7769/api/v1/media/search?q=test"

# Preview metadata extraction (without storing)
curl "http://localhost:7769/api/v1/media/extract?url=https://example.com"
```

## Technology Stack

- **Runtime**: Node.js with ES modules
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Node.js built-in test runner with Supertest
- **Build System**: TypeScript compilation, TailwindCSS processing
- **Code Quality**: ESLint, Prettier, package linting

## API Endpoints

### Media Management

```
POST   /api/v1/media              # Add new media to repository
GET    /api/v1/media/:id          # Get media details
GET    /api/v1/media/extract      # Preview metadata extraction (read-only)
GET    /api/v1/media              # List media items with pagination
GET    /api/v1/media/search       # Search media repository
```

### Health & Monitoring

```
GET    /health                    # Service health check
GET    /ping                      # Simple service status
```

## Getting Started

### Environment Configuration

Create a `.env` file with the following variables:

```bash
# Server Configuration
PORT=7769
BASE_URL=http://localhost:7769
NODE_ENV=development

# Database Configuration
MONGO_URL=mongodb://localhost:27017/watchthis-media

# Service URLs
USER_SERVICE_URL=http://localhost:8583
HOME_SERVICE_URL=http://localhost:7279

# API Keys (for metadata extraction)
YOUTUBE_API_KEY=your_youtube_api_key_here
```

### Installation

```bash
npm install
```

### Development

```bash
# Run in development mode (auto-restart on changes)
npm run dev

# Build TypeScript
npm run build

# Run tests
npm run test

# Lint and format code
npm run lint
npm run format
```

### Production

```bash
# Build for production
npm run build

# Start production server
npm run start
```

Visit http://localhost:7769 for the service dashboard.

## Database Schema

### Media Collection

```javascript
{
  _id: ObjectId,
  url: String,                    // Original media URL
  platform: String,              // 'youtube', 'spotify', 'article', etc.
  metadata: {
    title: String,
    description: String,
    thumbnail: String,
    duration: Number,             // in seconds
    author: String,
    publishedAt: Date,
    tags: [String]
  },
  extractionStatus: String,       // 'pending', 'completed', 'failed'
  extractionError: String,        // Error message if extraction fails
  extractedAt: Date,              // When metadata was extracted
  createdAt: Date,                // When item was added to repository
  updatedAt: Date                 // Last metadata update (automated only)
}
```

## Supported Platforms

### Phase 1 (Current)

- ✅ **YouTube**: Video metadata extraction
- ✅ **Generic URLs**: Basic metadata extraction
- ✅ **Direct Links**: Articles, blog posts, web content

### Phase 2 (Planned)

- 🔄 **Spotify**: Music and podcast metadata
- 🔄 **Vimeo**: Video content
- 🔄 **SoundCloud**: Audio content

### Phase 3 (Future)

- 📋 **Social Media**: Twitter threads, Instagram posts
- 📋 **Streaming**: Netflix, Disney+ (where legally possible)
- 📋 **Books**: Goodreads integration

## Code Quality Standards

The project maintains high code quality through:

```bash
# Run all quality checks
npm run lint          # ESLint with auto-fix
npm run format        # Prettier formatting
npm run package:lint  # Package.json validation
npm run test          # Comprehensive test suite
```

All code must:

- Pass TypeScript strict type checking
- Follow ESLint configuration
- Maintain 80%+ test coverage
- Include proper error handling
- Use async/await patterns consistently

## Architecture Integration

This service follows the WatchThis microservice patterns:

- **Health Checks**: Implements `/health` endpoint with dependency checking
- **Session Forwarding**: Integrates with user service for authentication
- **Event Publishing**: Publishes media events for other services
- **Graceful Degradation**: Handles external service failures gracefully
- **Environment Flexibility**: Supports development, test, and production configs

## Contributing

1. Follow the established TypeScript and Express patterns
2. Write comprehensive tests for new features
3. Update this README for significant changes
4. Ensure all quality checks pass before committing
5. Follow semantic versioning for releases

For detailed development guidelines, see `.copilot/rules.md` and `.copilot/workspace.md`.
