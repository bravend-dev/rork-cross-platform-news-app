import { API } from './api';
import { User, RegisterForm, UpdateProfileForm } from '../types';
import { getDeviceFingerprint } from '../constants/config';

/**
 * User service for handling user-related API calls
 */
export class UserService {
  /**
   * Register new user
   */
  async register(email: string, password: string, username: string, fullName: string, fingerprint?: string): Promise<User | null> {
    try {
      const deviceFingerprint = fingerprint || getDeviceFingerprint();
      const body = { email, password, username, fullname: fullName, fingerprint: deviceFingerprint };
      const response = await API.post<{ data?: { user?: User } }>('users/post/register', body);
      return response.data?.user || null;
    } catch (error) {
      console.error('Register error:', error);
      return null;
    }
  }

  /**
   * Login user
   */
  async login(email: string, password: string, fingerprint?: string): Promise<User | null> {
    try {
      const deviceFingerprint = fingerprint || getDeviceFingerprint();
      const body = { email, password, fingerprint: deviceFingerprint };
      const response = await API.post<{ data?: { user?: User } }>('users/post/login', body);
      return response.data?.user || null;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  }

  /**
   * Get user info by token
   */
  async getInfo(token: string): Promise<User | null> {
    try {
      const response = await API.post<{ data?: { user?: User } }>('users/post/info', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data?.user || null;
    } catch (error) {
      console.error('Get user info error:', error);
      return null;
    }
  }

  /**
   * Reset password
   */
  async resetPassword(email: string): Promise<any> {
    try {
      const response = await API.post('users/post/reset-password', { email });
      return response;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(token: string, profileData: UpdateProfileForm): Promise<User | null> {
    try {
      const response = await API.post<{ data?: { user?: User } }>('users/post/update-profile', profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data?.user || null;
    } catch (error) {
      console.error('Update profile error:', error);
      return null;
    }
  }

  /**
   * Sign out user
   */
  async signOut(token: string): Promise<void> {
    try {
      await API.post('users/post/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }
}

export const userService = new UserService();

// Export the API functions for direct use (matching your original functions)
export async function register(email: string, password: string, username: string, fullName: string, fingerprint?: string): Promise<User | null> {
  return userService.register(email, password, username, fullName, fingerprint);
}

export async function login(email: string, password: string, fingerprint?: string): Promise<User | null> {
  return userService.login(email, password, fingerprint);
}

export async function getInfo(token: string): Promise<User | null> {
  return userService.getInfo(token);
}

export async function resetPassword(email: string): Promise<any> {
  return userService.resetPassword(email);
}

export async function updateProfile(token: string, profileData: UpdateProfileForm): Promise<User | null> {
  return userService.updateProfile(token, profileData);
}

export async function signOut(token: string): Promise<void> {
  return userService.signOut(token);
}