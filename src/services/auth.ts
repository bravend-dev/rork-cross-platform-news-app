import { apiService, API_ENDPOINTS } from './api';
import { secureStorage, storage } from '../utils/storage';
import { User, Profile, ServicePlan, LoginForm, STORAGE_KEYS, ApiResponse } from '../types';

/**
 * Authentication service
 */
export class AuthService {
  /**
   * Login user with credentials
   */
  async login(credentials: LoginForm): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    try {
      // For now, using mock authentication
      // Replace with actual API call when backend is ready
      if (credentials.username === 'demo' && credentials.password === 'demo') {
        const user: User = {
          id: '1',
          username: 'demo',
          email: 'demo@example.com',
          createdAt: new Date().toISOString(),
        };

        const token = 'mock_token_' + Date.now();
        
        // Store credentials securely
        await secureStorage.setItem(STORAGE_KEYS.TOKEN, token);
        await storage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

        return { success: true, user, token };
      }

      return { success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Đã có lỗi xảy ra khi đăng nhập' };
    }
  }

  /**
   * Logout user and clear stored data
   */
  async logout(): Promise<void> {
    try {
      // Call logout API if needed
      // await apiService.post(API_ENDPOINTS.auth.logout);
      
      // Clear stored data
      await secureStorage.deleteItem(STORAGE_KEYS.TOKEN);
      await storage.multiRemove([
        STORAGE_KEYS.USER,
        STORAGE_KEYS.PROFILES,
        STORAGE_KEYS.CURRENT_PROFILE,
        STORAGE_KEYS.SERVICE_PLAN,
        STORAGE_KEYS.ONBOARDING_COMPLETE,
      ]);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  /**
   * Get current user from storage
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await storage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Get stored auth token
   */
  async getAuthToken(): Promise<string | null> {
    try {
      return await secureStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getAuthToken();
      const user = await this.getCurrentUser();
      return !!(token && user);
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  /**
   * Refresh auth token
   */
  async refreshToken(): Promise<{ success: boolean; token?: string; error?: string }> {
    try {
      const response = await apiService.post<{ token: string }>(API_ENDPOINTS.auth.refresh);
      
      if (response.success && response.data?.token) {
        await secureStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
        return { success: true, token: response.data.token };
      }
      
      return { success: false, error: 'Failed to refresh token' };
    } catch (error) {
      console.error('Token refresh error:', error);
      return { success: false, error: 'Token refresh failed' };
    }
  }

  /**
   * Create user profile
   */
  async createProfile(name: string, avatar?: string): Promise<{ success: boolean; profile?: Profile; error?: string }> {
    try {
      const user = await this.getCurrentUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const newProfile: Profile = {
        id: Date.now().toString(),
        name: name.trim(),
        avatar,
        userId: user.id,
        createdAt: new Date().toISOString(),
      };

      // Get existing profiles
      const profilesData = await storage.getItem(STORAGE_KEYS.PROFILES);
      const existingProfiles: Profile[] = profilesData ? JSON.parse(profilesData) : [];
      
      // Add new profile
      const updatedProfiles = [...existingProfiles, newProfile];
      await storage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(updatedProfiles));

      return { success: true, profile: newProfile };
    } catch (error) {
      console.error('Error creating profile:', error);
      return { success: false, error: 'Failed to create profile' };
    }
  }

  /**
   * Get user profiles
   */
  async getProfiles(): Promise<Profile[]> {
    try {
      const profilesData = await storage.getItem(STORAGE_KEYS.PROFILES);
      return profilesData ? JSON.parse(profilesData) : [];
    } catch (error) {
      console.error('Error getting profiles:', error);
      return [];
    }
  }

  /**
   * Select current profile
   */
  async selectProfile(profile: Profile): Promise<void> {
    try {
      await storage.setItem(STORAGE_KEYS.CURRENT_PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('Error selecting profile:', error);
      throw error;
    }
  }

  /**
   * Get current profile
   */
  async getCurrentProfile(): Promise<Profile | null> {
    try {
      const profileData = await storage.getItem(STORAGE_KEYS.CURRENT_PROFILE);
      return profileData ? JSON.parse(profileData) : null;
    } catch (error) {
      console.error('Error getting current profile:', error);
      return null;
    }
  }

  /**
   * Select service plan
   */
  async selectServicePlan(plan: ServicePlan): Promise<void> {
    try {
      await storage.setItem(STORAGE_KEYS.SERVICE_PLAN, plan);
    } catch (error) {
      console.error('Error selecting service plan:', error);
      throw error;
    }
  }

  /**
   * Get current service plan
   */
  async getServicePlan(): Promise<ServicePlan | null> {
    try {
      const plan = await storage.getItem(STORAGE_KEYS.SERVICE_PLAN);
      return plan as ServicePlan | null;
    } catch (error) {
      console.error('Error getting service plan:', error);
      return null;
    }
  }

  /**
   * Complete onboarding
   */
  async completeOnboarding(): Promise<void> {
    try {
      await storage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    }
  }

  /**
   * Check if onboarding is complete
   */
  async hasCompletedOnboarding(): Promise<boolean> {
    try {
      const completed = await storage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE);
      return completed === 'true';
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }
  }
}

export const authService = new AuthService();