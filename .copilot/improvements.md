# Media Service Implementation Plan and Improvements

## Project Status Overview

The `watchthis-media-service` is the first core service in the WatchThis MVP implementation. This service will handle media URL processing, metadata extraction, and content management.

**✅ PHASE 1 COMPLETE** - Basic service structure and core CRUD operations are now implemented!

## Implementation Phases

### Phase 1: Core Media Management ✅ COMPLETED

#### ✅ Implemented Features

##### 1. Basic Service Structure ✅

- [x] Set up Express application with TypeScript
- [x] Configure MongoDB connection with Mongoose
- [x] Implement health check endpoint (`/health`)
- [x] Add basic error handling middleware
- [x] Set up development environment with hot reloading
- [x] Added security headers with Helmet

##### 2. Media Model and Database Schema ✅

- [x] Create Media model with Mongoose schema
- [x] Implement URL validation and normalization
- [x] Add platform detection logic (YouTube, generic URLs)
- [x] Create database indexes for performance
- [x] Add validation for required fields
- [x] Support for metadata, tags, and extraction status

##### 3. Basic CRUD Operations ✅

- [x] `POST /api/v1/media` - Create new media item
- [x] `GET /api/v1/media/:id` - Retrieve media by ID
- [x] `PATCH /api/v1/media/:id` - Update media metadata
- [x] `DELETE /api/v1/media/:id` - Remove media item
- [x] `GET /api/v1/media` - List media with pagination and filtering

##### 4. URL Processing Pipeline ✅

- [x] Implement URL validation and sanitization
- [x] Add platform detection (YouTube, generic web pages)
- [x] Create metadata extraction interface (placeholder)
- [x] Handle duplicate URL detection
- [x] Add extraction status tracking
- [x] YouTube URL normalization (youtu.be, tracking params removal)

##### 5. Additional Features ✅

- [x] Search and filtering endpoints (`/api/v1/media/search`)
- [x] Metadata extraction preview (`/api/v1/media/extract`)
- [x] Comprehensive test suite
- [x] Error handling and validation
- [x] Full-text search support
- [x] Pagination for all list endpoints

## Implementation Notes

### Key Files Created/Modified:

- `src/models/media.ts` - Media MongoDB schema with full validation
- `src/utils/urlProcessor.ts` - URL validation, normalization, and platform detection
- `src/utils/asyncHandler.ts` - Async error handling wrapper
- `src/middleware/errorHandler.ts` - Centralized error handling
- `src/api.ts` - Complete REST API implementation
- `test/helpers/testData.ts` - Test data generators
- `test/media.test.ts` - Comprehensive test suite

### Database Schema Features:

- URL normalization to prevent duplicates
- Platform detection (YouTube vs generic)
- Content type classification (video, article, audio, unknown)
- Extraction status tracking (pending, completed, failed)
- Full-text search indexes on title and description
- Performance indexes on common query fields

### API Endpoints Implemented:

- `POST /api/v1/media` - Create media with URL validation
- `GET /api/v1/media/:id` - Get single media item
- `PATCH /api/v1/media/:id` - Update metadata (prevents URL changes)
- `DELETE /api/v1/media/:id` - Remove media item
- `GET /api/v1/media` - List with pagination and filters
- `GET /api/v1/media/search` - Full-text search with filters
- `GET /api/v1/media/extract` - Preview extraction without storing
- `GET /health` - Service health check
- `GET /ping` - Simple status check

### Phase 2: Metadata Extraction 🚧 NEXT PRIORITY

#### 🟡 High Priority - Core Functionality

##### 1. YouTube Integration

- [ ] Set up YouTube Data API v3 integration
- [ ] Extract video metadata (title, description, thumbnail, duration)
- [ ] Handle API rate limiting and errors
- [ ] Add caching for expensive API calls
- [ ] Test with various YouTube URL formats

##### 2. Generic URL Processing

- [ ] Implement Open Graph metadata extraction
- [ ] Add HTML meta tag parsing
- [ ] Extract basic page information (title, description)
- [ ] Handle redirects and canonical URLs
- [ ] Add image extraction for thumbnails

##### 3. Metadata Extraction Endpoint

- [x] `GET /api/v1/media/extract?url=...` - Extract without storing (basic implementation)
- [ ] Return standardized metadata format
- [ ] Handle extraction failures gracefully
- [ ] Add validation for extracted data
- [ ] Implement extraction result caching

### Phase 3: Search and Organization 🎯 PARTIALLY COMPLETE

#### 🟡 High Priority - User Experience

##### 1. Search and Filtering ✅

- [x] `GET /api/v1/media/search` - Search media by various criteria
- [x] Filter by platform, date, tags
- [x] Full-text search on titles and descriptions
- [x] Add sorting options (date, relevance, popularity)
- [x] Implement pagination for search results

##### 2. Media Categorization

- [x] Automatic platform categorization
- [x] Content type detection (video, article, music)
- [ ] Tag extraction from metadata
- [ ] Duration-based categorization
- [ ] Add manual categorization support

### Phase 4: Integration and Polish 📋 TODO

#### 🟢 Medium Priority - Service Integration

##### 1. Authentication Integration

- [ ] Integrate with watchthis-user-service for auth
- [ ] Add user context to media operations
- [ ] Implement permission checks
- [ ] Track media creation by user
- [ ] Add user-specific media queries

##### 2. Event Publishing

- [ ] Implement media event publishing
- [ ] Publish `MediaCreatedEvent` when media is added
- [ ] Publish `MediaUpdatedEvent` for modifications
- [ ] Add event validation and error handling
- [ ] Document event schemas

##### 3. Service Dashboard

- [ ] Create simple dashboard view
- [ ] Show service statistics
- [ ] Display recent media additions
- [ ] Add basic admin functionality
- [ ] Monitor extraction performance

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally or connection string
- npm or yarn

### Installation

```bash
cd watchthis-media-service
npm install
```

### Environment Variables

Create a `.env` file:

```env
MONGO_URL=mongodb://localhost:27017/media-service
NODE_ENV=development
PORT=8584
```

### Development

```bash
npm run dev        # Start with hot reloading
npm run build      # Build TypeScript
npm run test       # Run tests
npm run lint       # Check code quality
```

### Testing the API

#### Create a media item:

```bash
curl -X POST http://localhost:8584/api/v1/media \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
```

#### List media:

```bash
curl http://localhost:8584/api/v1/media
```

#### Search media:

```bash
curl "http://localhost:8584/api/v1/media/search?q=test&platform=youtube"
```

- [ ] Set up YouTube Data API v3 integration
- [ ] Extract video metadata (title, description, thumbnail, duration)
- [ ] Handle API rate limiting and errors
- [ ] Add caching for expensive API calls
- [ ] Test with various YouTube URL formats

##### 2. Generic URL Processing

- [ ] Implement Open Graph metadata extraction
- [ ] Add HTML meta tag parsing
- [ ] Extract basic page information (title, description)
- [ ] Handle redirects and canonical URLs
- [ ] Add image extraction for thumbnails

##### 3. Metadata Extraction Endpoint

- [ ] `GET /api/v1/media/extract?url=...` - Extract without storing
- [ ] Return standardized metadata format
- [ ] Handle extraction failures gracefully
- [ ] Add validation for extracted data
- [ ] Implement extraction result caching

### Phase 3: Search and Organization (Week 2)

#### 🟡 High Priority - User Experience

##### 1. Search and Filtering

- [ ] `GET /api/v1/media/search` - Search media by various criteria
- [ ] Filter by platform, date, tags
- [ ] Full-text search on titles and descriptions
- [ ] Add sorting options (date, relevance, popularity)
- [ ] Implement pagination for search results

##### 2. Media Categorization

- [ ] Automatic platform categorization
- [ ] Content type detection (video, article, music)
- [ ] Tag extraction from metadata
- [ ] Duration-based categorization
- [ ] Add manual categorization support

### Phase 4: Integration and Polish (Week 2)

#### 🟢 Medium Priority - Service Integration

##### 1. Authentication Integration

- [ ] Integrate with watchthis-user-service for auth
- [ ] Add user context to media operations
- [ ] Implement permission checks
- [ ] Track media creation by user
- [ ] Add user-specific media queries

##### 2. Event Publishing

- [ ] Implement media event publishing
- [ ] Publish `MediaCreatedEvent` when media is added
- [ ] Publish `MediaUpdatedEvent` for modifications
- [ ] Add event validation and error handling
- [ ] Document event schemas

##### 3. Service Dashboard

- [ ] Create simple dashboard view
- [ ] Show service statistics
- [ ] Display recent media additions
- [ ] Add basic admin functionality
- [ ] Monitor extraction performance

## API Specification

### Core Endpoints

```typescript
// Media CRUD Operations
POST   /api/v1/media
GET    /api/v1/media/:id
PATCH  /api/v1/media/:id
DELETE /api/v1/media/:id
GET    /api/v1/media

// Metadata Extraction
GET    /api/v1/media/extract?url={url}

// Search and Discovery
GET    /api/v1/media/search?q={query}&platform={platform}&type={type}

// Health and Monitoring
GET    /health
GET    /ping
```

### Request/Response Examples

#### Create Media Item

```typescript
POST /api/v1/media
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "extractMetadata": true
}

// Response
{
  "success": true,
  "data": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "platform": "youtube",
    "metadata": {
      "title": "Rick Astley - Never Gonna Give You Up",
      "description": "The official video for...",
      "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      "duration": 212,
      "author": "Rick Astley",
      "publishedAt": "2009-10-25T06:57:33Z"
    },
    "extractedAt": "2025-09-07T10:30:00Z",
    "createdAt": "2025-09-07T10:30:00Z"
  }
}
```

#### Extract Metadata (Preview)

```typescript
GET / api / v1 / media / extract
  ? (url = https) //www.youtube.com/watch?v=dQw4w9WgXcQ
  : // Response
    {
      success: true,
      data: {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        platform: "youtube",
        metadata: {
          title: "Rick Astley - Never Gonna Give You Up",
          description: "The official video for...",
          thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
          duration: 212,
          author: "Rick Astley",
          publishedAt: "2009-10-25T06:57:33Z",
        },
        extractedAt: "2025-09-07T10:30:00Z",
      },
    };
```

## Database Schema Implementation

### Media Collection

```typescript
interface MediaDocument {
  _id: ObjectId;
  url: string;
  normalizedUrl: string; // Canonical URL for duplicate detection
  platform: "youtube" | "spotify" | "article" | "generic";
  contentType: "video" | "audio" | "article" | "social" | "other";
  metadata: {
    title: string;
    description?: string;
    thumbnail?: string;
    duration?: number; // in seconds
    author?: string;
    publishedAt?: Date;
    tags?: string[];
    language?: string;
  };
  extractionStatus: "pending" | "completed" | "failed" | "cached";
  extractionError?: string;
  extractedAt?: Date;
  createdBy: ObjectId; // User ID
  createdAt: Date;
  updatedAt: Date;
}
```

### Indexes for Performance

```javascript
// Compound index for user queries
{ createdBy: 1, createdAt: -1 }

// Unique index for duplicate detection
{ normalizedUrl: 1 }, { unique: true }

// Text index for search
{
  "metadata.title": "text",
  "metadata.description": "text",
  "metadata.author": "text"
}

// Platform and type filtering
{ platform: 1, contentType: 1, createdAt: -1 }
```

## Technical Implementation Details

### Metadata Extraction Pipeline

```typescript
interface MetadataExtractor {
  platform: string;
  canHandle(url: string): boolean;
  extract(url: string): Promise<MediaMetadata>;
}

class YouTubeExtractor implements MetadataExtractor {
  platform = "youtube";

  canHandle(url: string): boolean {
    return /youtube\.com|youtu\.be/.test(url);
  }

  async extract(url: string): Promise<MediaMetadata> {
    // YouTube API integration
  }
}

class GenericExtractor implements MetadataExtractor {
  platform = "generic";

  canHandle(url: string): boolean {
    return true; // Fallback for all URLs
  }

  async extract(url: string): Promise<MediaMetadata> {
    // Open Graph / HTML meta extraction
  }
}
```

### Error Handling Strategy

```typescript
class MediaExtractionError extends Error {
  constructor(
    message: string,
    public platform: string,
    public url: string,
    public statusCode: number = 500
  ) {
    super(message);
  }
}

// Usage in extraction pipeline
try {
  const metadata = await extractor.extract(url);
  return metadata;
} catch (error) {
  if (error instanceof MediaExtractionError) {
    // Log and handle gracefully
    console.error(`Extraction failed for ${error.platform}: ${error.message}`);
    return null;
  }
  throw error;
}
```

## Environment Configuration

### Required Environment Variables

```bash
# Server Configuration
PORT=7769
BASE_URL=http://localhost:7769
NODE_ENV=development

# Database
MONGO_URL=mongodb://localhost:27017/watchthis-media
MONGO_URL_TEST=mongodb://localhost:27017/watchthis-media-test

# Service URLs
USER_SERVICE_URL=http://localhost:8583
HOME_SERVICE_URL=http://localhost:7279

# External APIs
YOUTUBE_API_KEY=your_youtube_api_key_here

# Caching (optional)
REDIS_URL=redis://localhost:6379

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100  # per window
```

## Testing Strategy

### Test Categories

#### 1. Unit Tests

- [ ] URL validation and normalization
- [ ] Platform detection logic
- [ ] Metadata extraction functions
- [ ] Database model validation
- [ ] Error handling scenarios

#### 2. Integration Tests

- [ ] End-to-end API workflows
- [ ] Database persistence
- [ ] External API integration (mocked)
- [ ] Authentication integration
- [ ] Error propagation

#### 3. Performance Tests

- [ ] API response times
- [ ] Database query performance
- [ ] Concurrent request handling
- [ ] Memory usage under load
- [ ] Rate limiting behavior

### Test Data Management

```typescript
// Test data factory
export const createTestMedia = (overrides?: Partial<MediaDocument>) => ({
  url: "https://www.youtube.com/watch?v=test123",
  platform: "youtube",
  contentType: "video",
  metadata: {
    title: "Test Video",
    description: "A test video description",
    thumbnail: "https://img.youtube.com/vi/test123/maxresdefault.jpg",
    duration: 180,
    author: "Test Channel",
  },
  extractionStatus: "completed",
  extractedAt: new Date(),
  createdBy: new ObjectId(),
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});
```

## Deployment and Monitoring

### Docker Configuration

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
COPY public ./public
COPY views ./views
EXPOSE 7769
CMD ["node", "dist/src/server.js"]
```

### Health Check Implementation

```typescript
app.get("/health", async (req, res) => {
  try {
    // Check database connection
    await mongoose.connection.db.admin().ping();

    // Check external service availability
    const userServiceHealth = await checkServiceHealth(USER_SERVICE_URL);

    res.json({
      service: "watchthis-media-service",
      version: packageJson.version,
      status: "healthy",
      timestamp: new Date().toISOString(),
      dependencies: {
        database: "healthy",
        userService: userServiceHealth ? "healthy" : "degraded",
      },
    });
  } catch (error) {
    res.status(503).json({
      service: "watchthis-media-service",
      status: "unhealthy",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});
```

## Future Enhancements

### Phase 2 Improvements

- [ ] **Multiple Platform Support**: Spotify, SoundCloud, Vimeo
- [ ] **Advanced Caching**: Redis-based metadata caching
- [ ] **Image Processing**: Thumbnail generation and optimization
- [ ] **Content Analysis**: Automatic tagging and categorization
- [ ] **Bulk Operations**: Import multiple URLs at once

### Phase 3 Advanced Features

- [ ] **AI-Powered Metadata**: Enhanced content analysis
- [ ] **Content Recommendation**: Similar content suggestions
- [ ] **Analytics Integration**: Usage tracking and insights
- [ ] **CDN Integration**: Optimized media delivery
- [ ] **Archive Management**: Long-term content preservation

## Success Metrics

### Development Metrics

- [ ] All tests passing with 80%+ coverage
- [ ] API response times < 200ms (95th percentile)
- [ ] Zero critical security vulnerabilities
- [ ] 99%+ uptime during development
- [ ] Successful YouTube metadata extraction rate > 95%

### MVP Success Criteria

- [ ] Successfully extract metadata from YouTube URLs
- [ ] Handle 1000+ media items without performance degradation
- [ ] Integrate seamlessly with user service authentication
- [ ] Support concurrent users without conflicts
- [ ] Graceful handling of external service failures

This implementation plan provides a clear roadmap for building the media service as the foundation of the WatchThis platform. Each phase builds upon the previous one, ensuring a solid, scalable solution.
