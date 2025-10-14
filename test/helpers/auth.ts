import nock from "nock";

// Test user data (using UUIDs instead of MongoDB ObjectIds)
export const testUsers = {
  user1: {
    id: "507f1f77-bcf8-6cd7-9943-9011abcd1234",
    username: "testuser1",
  },
  user2: {
    id: "507f1f77-bcf8-6cd7-9943-9012abcd1234",
    username: "testuser2",
  },
  user3: {
    id: "507f1f77-bcf8-6cd7-9943-9013abcd1234",
    username: "testuser3",
  },
};

/**
 * Mock the user service to return a successful JWT authentication
 * @param user - The user to authenticate as
 */
export function mockUserServiceJWTAuth(user: { id: string; username: string }) {
  const userServiceUrl = process.env.USER_SERVICE_URL ?? "http://localhost:8583";

  nock(userServiceUrl)
    .persist() // Keep the mock active for multiple requests
    .get("/api/v1/auth/me")
    .reply(200, {
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
        },
      },
    });
}

/**
 * Mock the user service to return JWT authentication failure
 */
export function mockUserServiceJWTAuthFailure() {
  const userServiceUrl = process.env.USER_SERVICE_URL ?? "http://localhost:8583";

  nock(userServiceUrl)
    .persist()
    .get("/api/v1/auth/me")
    .reply(401, {
      success: false,
      error: { code: "AUTHENTICATION_REQUIRED", message: "Authentication required" },
    });
}

/**
 * Clear all nock mocks
 */
export function clearUserServiceMocks() {
  nock.cleanAll();
}

/**
 * Setup test data - using UUIDs for consistent testing
 */
export const testData = {
  validUserId: testUsers.user1.id,
  anotherUserId: testUsers.user2.id,
  thirdUserId: testUsers.user3.id,
  invalidId: "invalid-id",
};

/**
 * Create a mock JWT token for supertest requests
 */
function createMockJWTToken(user: { id: string; username: string }) {
  // In real implementation, this would be a proper JWT token
  // For testing, we just need a string that our mock will recognize
  return `mock-jwt-token-${user.id}`;
}

/**
 * Helper to make authenticated requests in tests
 */
export function authenticateAs(user: { id: string; username: string }) {
  mockUserServiceJWTAuth(user);
  return {
    token: createMockJWTToken(user),
    authHeader: `Bearer ${createMockJWTToken(user)}`,
    user,
  };
}
