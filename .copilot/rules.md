# Copilot Rules for watchthis-media-service

## Project Overview

This is a Node.js/Express media management service built with TypeScript and MongoDB. It provides media URL processing, metadata extraction, and content management functionality for the WatchThis application ecosystem.

## Architecture & Patterns

### Application Structure

- **Entry Point**: `src/server.ts` - Simple server startup
- **Main App**: `src/app.ts` - Express application configuration and routes
- **Models**: `src/models/` - Mongoose models for media data
- **Services**: `src/services/` - Business logic for metadata extraction
- **Middleware**: `src/middleware/` - Authentication and validation
- **Utils**: `src/utils/` - Helper functions and utilities
- **Views**: `views/` - Pug templates for service dashboard
- **Tests**: `test/` - Node.js test runner with Supertest

### Technology Stack

- **Runtime**: Node.js with ES modules (`"type": "module"`)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Media Processing**: YouTube API, Open Graph metadata extraction
- **Templates**: Pug view engine
- **Styling**: TailwindCSS with PostCSS
- **Testing**: Node.js built-in test runner with Supertest
- **Build**: TypeScript compilation to `dist/` directory

## Code Style & Conventions

### TypeScript Configuration

- Use ES modules throughout (`import/export`)
- Target output to `dist/` directory
- Enable strict type checking
- Use proper interface definitions for media data structures
- Always type Express middleware functions with proper request types

### Media Processing Patterns

- **URL Validation**: Validate and normalize media URLs before processing
- **Metadata Extraction**: Use platform-specific APIs when available, fallback to generic extraction
- **Error Handling**: Gracefully handle extraction failures and invalid URLs
- **Caching**: Cache extracted metadata to avoid repeated API calls
- **Rate Limiting**: Respect external API rate limits

### Database Patterns

- Use Mongoose for MongoDB interactions
- Implement proper validation schemas
- Use indexes for frequently queried fields
- Handle duplicate URL detection
- Implement soft deletes for media items

### Route Handling

- Use async functions wrapped with asyncHandler for route handlers
- Always handle errors in async routes with try/catch
- Use proper HTTP status codes
- Implement proper API response formatting
- Use middleware for authentication and validation

### Error Handling

- Use try/catch blocks for all async operations
- Log errors to console for debugging
- Return appropriate HTTP status codes
- Provide user-friendly error messages
- Never expose sensitive information in error messages

## Development Conventions

### File Organization

- Keep route definitions modular in `src/routes/` directory
- Separate business logic in `src/services/` directory
- Place models in `src/models/` directory
- Use proper imports with `.js` extension for compiled output
- Keep types and interfaces close to their usage

### Testing Standards

- Use Node.js built-in test runner
- Create test database connections separate from production
- Use realistic test data for media URLs
- Test both success and failure scenarios for metadata extraction
- Clean up test data after tests
- Use Supertest for HTTP endpoint testing
- Mock external API calls in tests

### Environment Configuration

- Use dotenv for environment variable management
- Provide defaults for all environment variables
- Use different database names for test environment
- Support both development and production configurations
- Secure API keys and external service credentials

### Build & Development

- Use concurrent builds for TypeScript, server, and CSS
- Support watch mode for development
- Separate build and start commands
- Use nodemon for development server restarts
- Build CSS with PostCSS and TailwindCSS

## Security Best Practices

### Input Validation

- Validate all media URLs before processing
- Sanitize user inputs before database operations
- Use proper error handling for invalid inputs
- Implement rate limiting for API endpoints
- Validate file types and sizes for uploads

### External Service Integration

- Use secure HTTPS connections for external APIs
- Store API keys securely in environment variables
- Implement proper timeout handling for external requests
- Handle API rate limits gracefully
- Log security-relevant events

### Data Protection

- Never store sensitive user data in this service
- Validate user permissions through user service
- Implement proper access controls for media operations
- Sanitize metadata before storage
- Handle GDPR considerations for cached data

## API Design

### Endpoint Patterns

- Use RESTful conventions for media CRUD operations
- Implement proper authentication middleware
- Support pagination for large result sets
- Provide clear success/failure responses
- Use semantic HTTP status codes

### Response Handling

- Return appropriate content types (JSON for API, HTML for dashboard)
- Use consistent error response format
- Implement proper caching headers
- Support content negotiation where appropriate
- Provide detailed validation error messages

### Media Processing Endpoints

- `/api/v1/media/extract` - Extract metadata from URL without storing
- `/api/v1/media` - CRUD operations for stored media
- `/api/v1/media/search` - Search and filter media items
- `/health` - Service health with external dependency status

## Performance Considerations

### Database Optimization

- Use proper indexes for search queries
- Implement pagination for large datasets
- Cache frequently accessed metadata
- Use lean queries for list operations
- Monitor query performance

### External API Management

- Cache metadata extraction results
- Implement request queuing for rate-limited APIs
- Use connection pooling for HTTP requests
- Handle timeouts and retries appropriately
- Monitor external service latency

### Memory Management

- Stream large file operations when possible
- Clean up temporary files and resources
- Monitor memory usage in production
- Use appropriate data structures for performance
- Implement garbage collection considerations

## Testing Guidelines

### Unit Testing

- Test metadata extraction logic thoroughly
- Mock external API dependencies
- Test error handling and edge cases
- Validate database operations
- Test input validation and sanitization

### Integration Testing

- Test complete API workflows end-to-end
- Verify database persistence
- Test service integration points
- Validate error propagation
- Test authentication integration

### Performance Testing

- Test API response times under load
- Validate database query performance
- Test external API integration under various conditions
- Monitor memory usage during tests
- Test concurrent request handling

## Debugging & Monitoring

### Logging

- Log all media processing operations
- Include correlation IDs for request tracking
- Log external API interactions
- Use structured logging format
- Separate debug and production log levels

### Health Monitoring

- Implement comprehensive health checks
- Monitor external service dependencies
- Track API response times
- Monitor database connection health
- Provide service status dashboard

### Error Tracking

- Log all errors with context
- Track external service failures
- Monitor rate limiting events
- Capture performance degradation
- Implement alerting for critical failures

## Code Quality

### Static Analysis

- Use ESLint with strict rules
- Implement Prettier for consistent formatting
- Use TypeScript strict mode
- Validate package.json configuration
- Check for security vulnerabilities

### Code Review Standards

- Review all metadata extraction logic
- Validate error handling patterns
- Check external service integration
- Verify test coverage
- Ensure documentation accuracy

### Documentation Requirements

- Document all API endpoints with examples
- Maintain up-to-date README
- Comment complex metadata extraction logic
- Provide setup and deployment guides
- Document external service dependencies

## Deployment Considerations

### Build Process

- Compile TypeScript to JavaScript
- Build CSS from TailwindCSS sources
- Include all necessary files in distribution
- Support containerized deployment
- Validate all environment variables

### Environment Variables

- Document all required environment variables
- Provide development defaults for local development
- Configure proper service URLs for each environment
- Secure all API keys and credentials
- Support multiple deployment environments

### Service Dependencies

- Handle user service unavailability gracefully
- Implement proper health checks for dependencies
- Monitor service connectivity
- Plan for database migration scenarios
- Document service startup order

## Microservice Patterns

### Service Communication

- Use HTTP for service-to-service communication
- Implement proper timeout and retry patterns
- Handle service discovery requirements
- Maintain loose coupling between services
- Use event-driven patterns where appropriate

### Data Management

- Own all media-related data
- Avoid storing user data directly
- Implement proper data consistency patterns
- Handle distributed transaction scenarios
- Plan for data migration and backup

### Error Handling

- Implement circuit breaker patterns for external services
- Provide degraded functionality when possible
- Handle partial failures gracefully
- Implement proper timeout and retry logic
- Log service communication issues appropriately
