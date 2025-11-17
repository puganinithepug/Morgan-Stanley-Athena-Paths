// Use relative URL in production (same origin), or explicit URL for development
export const API_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000');

