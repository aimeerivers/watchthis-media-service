/**
 * Test data generators for media service tests
 */

export function generateValidUrl(): string {
  const domains = ['example.com', 'test.org', 'sample.net'];
  const paths = ['', '/path', '/path/to/resource', '/article/123'];
  
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const path = paths[Math.floor(Math.random() * paths.length)];
  
  return `https://${domain}${path}`;
}

export function generateYouTubeUrl(): string {
  const videoId = Math.random().toString(36).substring(2, 13);
  const formats = [
    `https://www.youtube.com/watch?v=${videoId}`,
    `https://youtube.com/watch?v=${videoId}`,
    `https://youtu.be/${videoId}`,
    `https://m.youtube.com/watch?v=${videoId}`
  ];
  
  return formats[Math.floor(Math.random() * formats.length)];
}

export function generateInvalidUrl(): string {
  const invalidUrls = [
    'not-a-url',
    'ftp://invalid.com',
    'javascript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'http://',
    'https://.com'
  ];
  
  return invalidUrls[Math.floor(Math.random() * invalidUrls.length)];
}

export function generateMediaData(overrides: Record<string, unknown> = {}) {
  return {
    url: generateValidUrl(),
    title: 'Test Media Title',
    description: 'Test media description',
    ...overrides
  };
}
