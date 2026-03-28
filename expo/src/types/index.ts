// Core types used throughout the application
export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Profile {
  id: string;
  name: string;
  avatar?: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Magazine {
  id: string;
  title: string;
  issue: string;
  date: string;
  cover: string;
  isLatest?: boolean;
  description?: string;
  content?: string;
  category?: string;
}

// New types for API integration
export interface Zone {
  id: string;
  name: string;
  description?: string;
  order?: number;
}

export interface Content {
  id: string;
  title: string;
  description?: string;
  content?: string;
  image?: string;
  publishedAt: string;
  zoneId: string;
  author?: string;
  tags?: string[];
  viewCount?: number;
  isPopular?: boolean;
}

export interface RegisterForm {
  email: string;
  password: string;
  username: string;
  fullName: string;
}

export interface UpdateProfileForm {
  username?: string;
  fullName?: string;
  email?: string;
  avatar?: string;
}

export interface SocialLink {
  id: string;
  name: string;
  platform: 'facebook' | 'tiktok' | 'instagram' | 'youtube';
  color: string;
  url?: string;
}

export type ServicePlan = 'basic' | 'standard' | 'premium';

export interface AuthState {
  user: User | null;
  profiles: Profile[];
  currentProfile: Profile | null;
  servicePlan: ServicePlan | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
}

export interface AuthActions {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  selectServicePlan: (plan: ServicePlan) => Promise<void>;
  createProfile: (name: string, avatar?: string) => Promise<Profile>;
  selectProfile: (profile: Profile) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Navigation types
export interface TabParamList {
  home: undefined;
  search: undefined;
  categories: undefined;
  account: undefined;
}

export interface RootStackParamList {
  loading: undefined;
  login: undefined;
  'service-selection': undefined;
  'profile-selection': undefined;
  'create-profile': undefined;
  '(tabs)': undefined;
  'detail/[id]': { id: string };
  subscription: undefined;
  'add-account': undefined;
}

// Form types
export interface LoginForm {
  username: string;
  password: string;
}

export interface CreateProfileForm {
  name: string;
  avatar?: string;
}

// Storage keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  PROFILES: 'user_profiles',
  CURRENT_PROFILE: 'current_profile',
  SERVICE_PLAN: 'service_plan',
  ONBOARDING_COMPLETE: 'onboarding_complete',
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];