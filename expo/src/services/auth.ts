import { API } from './api';
import { secureStorage, storage } from '../utils/storage';
import { User, Profile, ServicePlan, LoginForm, RegisterForm, UpdateProfileForm, STORAGE_KEYS } from '../types';
import { getDeviceFingerprint } from '../constants/config';

/**
 * Authentication service
 */
export class AuthService {
  /**
   * Login user with credentials
   */
  async login(credentials: LoginForm): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    try {
      const fingerprint = getDeviceFingerprint();
      const response = await API.post<{ data?: { user?: User; token?: string } }>('users/post/login', {
        email: credentials.username, // Assuming username is email
        password: credentials.password,
        fingerprint,
      });

      if (response.data?.user) {
        const user = response.data.user;
        const token = response.data.token || 'mock_token_' + Date.now();
        
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
   * Register new user
   */
  async register(credentials: RegisterForm): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const fingerprint = getDeviceFingerprint();
      const response = await API.post<{ data?: { user?: User } }>('users/post/register', {
        email: credentials.email,
        password: credentials.password,
        username: credentials.username,
        fullname: credentials.fullName,
        fingerprint,
      });

      if (response.data?.user) {
        return { success: true, user: response.data.user };
      }

      return { success: false, error: 'Đăng ký thất bại' };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Đã có lỗi xảy ra khi đăng ký' };
    }
  }

  /**
   * Get user info by token
   */
  async getUserInfo(): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        return { success: false, error: 'No auth token found' };
      }

      const response = await API.post<{ data?: { user?: User } }>('users/post/info', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data?.user) {
        await storage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user));
        return { success: true, user: response.data.user };
      }

      return { success: false, error: 'Failed to get user info' };
    } catch (error) {
      console.error('Get user info error:', error);
      return { success: false, error: 'Đã có lỗi xảy ra khi lấy thông tin người dùng' };
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(profileData: UpdateProfileForm): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        return { success: false, error: 'No auth token found' };
      }

      const response = await API.post<{ data?: { user?: User } }>('users/post/update-profile', profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data?.user) {
        await storage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user));
        return { success: true, user: response.data.user };
      }

      return { success: false, error: 'Failed to update profile' };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: 'Đã có lỗi xảy ra khi cập nhật thông tin' };
    }
  }

  /**
   * Reset password
   */
  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      await API.post('users/post/reset-password', { email });
      return { success: true };
    } catch (error) {
      console.error('Reset password error:', error);
      return { success: false, error: 'Đã có lỗi xảy ra khi đặt lại mật khẩu' };
    }
  }

  /**
   * Logout user and clear stored data
   */
  async logout(): Promise<void> {
    try {
      const token = await this.getAuthToken();
      if (token) {
        try {
          await API.post('users/post/logout', {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (error) {
          console.warn('Logout API call failed:', error);
        }
      }
      
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
   * Refresh auth token by getting user info
   */
  async refreshToken(): Promise<{ success: boolean; token?: string; error?: string }> {
    try {
      const userInfoResult = await this.getUserInfo();
      if (userInfoResult.success) {
        const token = await this.getAuthToken();
        return { success: true, token: token || undefined };
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