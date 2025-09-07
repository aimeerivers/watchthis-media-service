You are assisting with the watchthis-media-service, a Node.js/Express media management microservice that handles media URLs, metadata extraction, and content management for the WatchThis application ecosystem.

When working in this codebase:

1. **Media Management Focus**: This service handles all media-related operations - prioritize metadata accuracy, URL validation, and content categorization

2. **TypeScript & ES Modules**: Use proper ES module syntax with `.js` extensions in imports for compiled output

3. **Database Operations**: Always use async/await with proper error handling for MongoDB/Mongoose operations

4. **External API Integration**: Handle YouTube API, Open Graph extraction, and other external services with proper error handling and rate limiting

5. **Testing**: Test metadata extraction thoroughly using Node.js test runner and Supertest. Mock external API dependencies appropriately.

6. **Security**: Validate all URLs before processing, sanitize metadata before storage, use secure external API integration

7. **Environment Configuration**: Support development, test, and production with proper defaults and secure API key management

8. **Express Patterns**: Use asyncHandler utility for consistent error handling, implement validation middleware, and use proper HTTP status codes

9. **Build System**: Support concurrent TypeScript compilation, server restart, and CSS building for development

10. **Code Quality**: Always ensure code passes `npm run build`, `npm run test`, `npm run lint`, and `npm run format`

11. **Microservice Patterns**:
    - Handle external service failures gracefully (YouTube API, metadata extraction)
    - Don't store user data directly - validate permissions through user service
    - Implement proper health checks with dependency monitoring
    - Publish media events for other services to consume

12. **Media Processing**:
    - Extract accurate metadata from various platforms
    - Handle different media types (video, audio, articles, social media)
    - Implement caching for expensive extraction operations
    - Provide fallback extraction methods when APIs fail

Remember: This service is the foundation for all media sharing - metadata accuracy and reliable extraction are critical for user experience. Handle edge cases gracefully and always validate external data before storage.
