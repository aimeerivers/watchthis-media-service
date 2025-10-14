# WatchThis Media Service

Media management service for the WatchThis platform. Handles media URLs, metadata extraction, and content management.

## 🚀 Status: Phase 1 Complete!

✅ **Core CRUD operations implemented**  
✅ **PostgreSQL integration with full schema**  
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

- Node.js 22+
- PostgreSQL 16+ running locally
- Git

### PostgreSQL Database Setup

1. **Install PostgreSQL** (if not already installed):

   ```bash
   # macOS with Homebrew
   brew install postgresql
   brew services start postgresql

   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql

   # Windows
   # Download from https://www.postgresql.org/download/windows/
   ```

2. **Create database and user**:

   ```bash
   # Connect to PostgreSQL as superuser
   psql -U postgres

   # Create user and databases
   CREATE USER watchthis WITH PASSWORD 'watchthis_dev';
   CREATE DATABASE watchthis_media OWNER watchthis;
   CREATE DATABASE watchthis_media_test OWNER watchthis;
   GRANT ALL PRIVILEGES ON DATABASE watchthis_media TO watchthis;
   GRANT ALL PRIVILEGES ON DATABASE watchthis_media_test TO watchthis;
   \q
   ```

3. **Verify connection**:
   ```bash
   psql -U watchthis -d watchthis_media -h localhost
   # Enter password: watchthis_dev
   # Should connect successfully, then type \q to quit
   ```

### Installation

```bash
git clone <repository-url>
cd watchthis-media-service
npm install
cp .env.example .env
# Edit .env with your PostgreSQL connection string
npm run database:setup  # Set up Prisma schema
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
- **Database**: PostgreSQL with Prisma ORM
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

# Database management
npm run database:setup         # Set up database schema
npm run database:test:setup    # Set up test database schema

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

## Troubleshooting

### Database Connection Issues

1. **PostgreSQL not running**:

   ```bash
   # Check if PostgreSQL is running
   pg_isready -h localhost -p 5432

   # Start PostgreSQL service
   # macOS: brew services start postgresql
   # Linux: sudo systemctl start postgresql
   ```

2. **Authentication failed**:

   ```bash
   # Check if user exists and has correct permissions
   psql -U postgres -c "SELECT rolname FROM pg_roles WHERE rolname = 'watchthis';"

   # Reset user password if needed
   psql -U postgres -c "ALTER USER watchthis PASSWORD 'watchthis_dev';"
   ```

3. **Database doesn't exist**:

   ```bash
   # Create databases if they don't exist
   psql -U postgres -c "CREATE DATABASE watchthis_media OWNER watchthis;"
   psql -U postgres -c "CREATE DATABASE watchthis_media_test OWNER watchthis;"
   ```

4. **Prisma client errors**:

   ```bash
   # Regenerate Prisma client
   npx prisma generate

   # Reset database schema
   npm run database:setup
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
