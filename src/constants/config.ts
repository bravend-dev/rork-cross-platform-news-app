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