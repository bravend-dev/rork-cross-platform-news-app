// Data source configuration - Toggle between mock and API data
export const DATA_CONFIG = {
  USE_MOCK_DATA: true, // Set to false when API is ready
  MOCK_API_DELAY: {
    SHORT: 400,
    MEDIUM: 600,
    LONG: 1000,
  },
} as const;

// Mock data configuration
export const MOCK_CONFIG = {
  // Test credentials for mock login
  TEST_CREDENTIALS: {
    email: 'test@example.com',
    password: 'password',
  },
  // Default pagination
  DEFAULT_PAGE_SIZE: 10,
  // Mock user token
  MOCK_TOKEN: 'mock-jwt-token-12345',
} as const;

// App configuration constants
export const APP_CONFIG = {
  name: 'Trí Thức & Cuộc Sống',
  version: '1.0.0',
  description: 'Ứng dụng đọc báo Khoa học và Đời sống',
  contact: {
    email: 'baotrithuecuocsong@kienthuc.net.vn',
    phone: '096 523 7766 - 091 181 1111',
    address: 'Tòa soạn Hà Nội',
  },
} as const;

export const API_CONFIG = {
  baseUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
  timeout: 10000,
  retryAttempts: 3,
} as const;

// Device fingerprint for API requests
export const getDeviceFingerprint = (): string => {
  // Generate a simple device fingerprint
  // In production, you might want to use a more sophisticated approach
  return `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const STORAGE_CONFIG = {
  encryptionKey: process.env.EXPO_PUBLIC_ENCRYPTION_KEY || 'default-key',
  maxCacheSize: 50 * 1024 * 1024, // 50MB
} as const;

export const FEATURE_FLAGS = {
  enablePushNotifications: true,
  enableOfflineMode: true,
  enableAnalytics: true,
  enableCrashReporting: true,
  enableBiometricAuth: true,
} as const;

export const PAGINATION = {
  defaultLimit: 20,
  maxLimit: 100,
} as const;

export const VALIDATION = {
  username: {
    minLength: 3,
    maxLength: 50,
  },
  password: {
    minLength: 6,
    maxLength: 128,
  },
  profileName: {
    minLength: 1,
    maxLength: 100,
  },
} as const;

export const URLS = {
  privacyPolicy: 'https://example.com/privacy',
  termsOfService: 'https://example.com/terms',
  support: 'https://example.com/support',
  website: 'https://example.com',
} as const;