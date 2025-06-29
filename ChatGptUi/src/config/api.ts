// API configuration for different environments
const getApiBaseUrl = (): string => {
  // In production (Docker), the API is proxied through nginx at /api
  if (import.meta.env.PROD) {
    return '/api';
  }
  
  // In development, use the direct API URL
  return 'http://localhost:5221';
};

export const API_CONFIG = {
  baseUrl: getApiBaseUrl(),
  endpoints: {
    gitDiff: '/gitdiff',
    codeReview: '/codereview',
  }
}; 