import { useState, useEffect, useCallback, useMemo } from 'react';
import createContextHook from '@nkzw/create-context-hook';
import { authService } from '@/services/auth';
import { User, Profile, ServicePlan, AuthState, AuthActions } from '@/types';

/**
 * Enhanced Auth Context with better error handling and type safety
 */
export const [AuthProvider, useAuth] = createContextHook(() => {
  const [state, setState] = useState<AuthState>({
    user: null,
    profiles: [],
    currentProfile: null,
    servicePlan: null,
    isLoading: true,
    isAuthenticated: false,
    hasCompletedOnboarding: false,
  });

  const checkAuthStatus = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const [user, profiles, currentProfile, servicePlan, hasCompletedOnboarding] = await Promise.all([
        authService.getCurrentUser(),
        authService.getProfiles(),
        authService.getCurrentProfile(),
        authService.getServicePlan(),
        authService.hasCompletedOnboarding(),
      ]);

      const isAuthenticated = !!(user && await authService.getAuthToken());

      setState({
        user,
        profiles,
        currentProfile,
        servicePlan,
        isAuthenticated,
        hasCompletedOnboarding,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error checking auth status:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      const result = await authService.login({ username, password });
      if (result.success && result.user) {
        setState(prev => ({
          ...prev,
          user: result.user!,
          isAuthenticated: true,
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await authService.logout();
      setState({
        user: null,
        profiles: [],
        currentProfile: null,
        servicePlan: null,
        isLoading: false,
        isAuthenticated: false,
        hasCompletedOnboarding: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }, []);

  const selectServicePlan = useCallback(async (plan: ServicePlan): Promise<void> => {
    try {
      await authService.selectServicePlan(plan);
      setState(prev => ({ ...prev, servicePlan: plan }));
    } catch (error) {
      console.error('Error selecting service plan:', error);
      throw error;
    }
  }, []);

  const createProfile = useCallback(async (name: string, avatar?: string): Promise<Profile> => {
    try {
      const result = await authService.createProfile(name, avatar);
      if (result.success && result.profile) {
        const updatedProfiles = [...state.profiles, result.profile];
        setState(prev => ({ ...prev, profiles: updatedProfiles }));
        return result.profile;
      }
      throw new Error(result.error || 'Failed to create profile');
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }, [state.profiles]);

  const selectProfile = useCallback(async (profile: Profile): Promise<void> => {
    try {
      await authService.selectProfile(profile);
      setState(prev => ({ ...prev, currentProfile: profile }));
    } catch (error) {
      console.error('Error selecting profile:', error);
      throw error;
    }
  }, []);

  const completeOnboarding = useCallback(async (): Promise<void> => {
    try {
      await authService.completeOnboarding();
      setState(prev => ({ ...prev, hasCompletedOnboarding: true }));
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const actions: AuthActions = useMemo(() => ({
    login,
    logout,
    selectServicePlan,
    createProfile,
    selectProfile,
    checkAuthStatus,
    completeOnboarding,
  }), [login, logout, selectServicePlan, createProfile, selectProfile, checkAuthStatus, completeOnboarding]);

  return useMemo(() => ({
    ...state,
    ...actions,
  }), [state, actions]);
});