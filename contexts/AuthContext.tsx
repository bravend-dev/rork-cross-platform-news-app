import { useState, useEffect, useCallback, useMemo } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import createContextHook from '@nkzw/create-context-hook';

interface User {
  id: string;
  username: string;
  email: string;
}

interface Profile {
  id: string;
  name: string;
  avatar?: string;
  userId: string;
}

type ServicePlan = 'basic' | 'standard' | 'premium';

interface AuthState {
  user: User | null;
  profiles: Profile[];
  currentProfile: Profile | null;
  servicePlan: ServicePlan | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
}

interface AuthActions {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  selectServicePlan: (plan: ServicePlan) => Promise<void>;
  createProfile: (name: string, avatar?: string) => Promise<Profile>;
  selectProfile: (profile: Profile) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  PROFILES: 'user_profiles',
  CURRENT_PROFILE: 'current_profile',
  SERVICE_PLAN: 'service_plan',
  ONBOARDING_COMPLETE: 'onboarding_complete'
};

// Secure storage wrapper for cross-platform compatibility
const secureStorage = {
  async setItem(key: string, value: string) {
    if (!key?.trim() || !value?.trim()) return;
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  async getItem(key: string): Promise<string | null> {
    if (!key?.trim()) return null;
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  },
  async deleteItem(key: string) {
    if (!key?.trim()) return;
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }
};

export const [AuthProvider, useAuth] = createContextHook(() => {
  // Storage wrapper for AsyncStorage functionality
  const storage = {
    async setItem(key: string, value: string) {
      if (!key?.trim() || !value?.trim()) return;
      if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
      } else {
        const { default: AsyncStorage } = await import('@react-native-async-storage/async-storage');
        await AsyncStorage.setItem(key, value);
      }
    },
    async getItem(key: string): Promise<string | null> {
      if (!key?.trim()) return null;
      if (Platform.OS === 'web') {
        return localStorage.getItem(key);
      } else {
        const { default: AsyncStorage } = await import('@react-native-async-storage/async-storage');
        return await AsyncStorage.getItem(key);
      }
    },
    async multiRemove(keys: string[]) {
      if (!keys?.length) return;
      if (Platform.OS === 'web') {
        keys.forEach(key => localStorage.removeItem(key));
      } else {
        const { default: AsyncStorage } = await import('@react-native-async-storage/async-storage');
        await AsyncStorage.multiRemove(keys);
      }
    }
  };

  const [state, setState] = useState<AuthState>({
    user: null,
    profiles: [],
    currentProfile: null,
    servicePlan: null,
    isLoading: true,
    isAuthenticated: false,
    hasCompletedOnboarding: false
  });

  const checkAuthStatus = useCallback(async () => {
    try {
      const token = await secureStorage.getItem(STORAGE_KEYS.TOKEN);
      const userData = await storage.getItem(STORAGE_KEYS.USER);
      const profilesData = await storage.getItem(STORAGE_KEYS.PROFILES);
      const currentProfileData = await storage.getItem(STORAGE_KEYS.CURRENT_PROFILE);
      const servicePlanData = await storage.getItem(STORAGE_KEYS.SERVICE_PLAN);
      const onboardingComplete = await storage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE);

      if (token && userData) {
        const user = JSON.parse(userData);
        const profiles = profilesData ? JSON.parse(profilesData) : [];
        const currentProfile = currentProfileData ? JSON.parse(currentProfileData) : null;
        const servicePlan = servicePlanData as ServicePlan | null;

        setState(prev => ({
          ...prev,
          user,
          profiles,
          currentProfile,
          servicePlan,
          isAuthenticated: true,
          hasCompletedOnboarding: onboardingComplete === 'true',
          isLoading: false
        }));
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      if (!username?.trim() || !password?.trim()) return false;
      
      // Mock API call - replace with actual API
      if (username === 'demo' && password === 'demo') {
        const user: User = {
          id: '1',
          username: 'demo',
          email: 'demo@example.com'
        };

        const token = 'mock_token_' + Date.now();
        
        await secureStorage.setItem(STORAGE_KEYS.TOKEN, token);
        await storage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

        setState(prev => ({
          ...prev,
          user,
          isAuthenticated: true
        }));

        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await secureStorage.deleteItem(STORAGE_KEYS.TOKEN);
      await storage.multiRemove([
        STORAGE_KEYS.USER,
        STORAGE_KEYS.PROFILES,
        STORAGE_KEYS.CURRENT_PROFILE,
        STORAGE_KEYS.SERVICE_PLAN,
        STORAGE_KEYS.ONBOARDING_COMPLETE
      ]);

      setState({
        user: null,
        profiles: [],
        currentProfile: null,
        servicePlan: null,
        isLoading: false,
        isAuthenticated: false,
        hasCompletedOnboarding: false
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const selectServicePlan = useCallback(async (plan: ServicePlan) => {
    try {
      if (!plan?.trim()) return;
      await storage.setItem(STORAGE_KEYS.SERVICE_PLAN, plan);
      setState(prev => ({ ...prev, servicePlan: plan }));
    } catch (error) {
      console.error('Error selecting service plan:', error);
    }
  }, []);

  const createProfile = useCallback(async (name: string, avatar?: string): Promise<Profile> => {
    try {
      if (!name?.trim()) throw new Error('Profile name is required');
      
      const newProfile: Profile = {
        id: Date.now().toString(),
        name: name.trim(),
        avatar,
        userId: state.user!.id
      };

      const updatedProfiles = [...state.profiles, newProfile];
      await storage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(updatedProfiles));
      
      setState(prev => ({
        ...prev,
        profiles: updatedProfiles
      }));

      return newProfile;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }, [state.profiles, state.user]);

  const selectProfile = useCallback(async (profile: Profile) => {
    try {
      if (!profile?.id) return;
      await storage.setItem(STORAGE_KEYS.CURRENT_PROFILE, JSON.stringify(profile));
      setState(prev => ({ ...prev, currentProfile: profile }));
    } catch (error) {
      console.error('Error selecting profile:', error);
    }
  }, []);

  const completeOnboarding = useCallback(async () => {
    try {
      await storage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');
      setState(prev => ({ ...prev, hasCompletedOnboarding: true }));
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return useMemo(() => ({
    ...state,
    login,
    logout,
    selectServicePlan,
    createProfile,
    selectProfile,
    checkAuthStatus,
    completeOnboarding
  }), [state, login, logout, selectServicePlan, createProfile, selectProfile, checkAuthStatus, completeOnboarding]);
});