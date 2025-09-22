import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import { User, Profile, ServicePlan, LoginForm } from '@/types';

/**
 * Query keys for auth-related queries
 */
export const AUTH_QUERY_KEYS = {
  user: ['auth', 'user'] as const,
  profiles: ['auth', 'profiles'] as const,
  currentProfile: ['auth', 'currentProfile'] as const,
  servicePlan: ['auth', 'servicePlan'] as const,
  onboardingStatus: ['auth', 'onboardingStatus'] as const,
} as const;

/**
 * Hook for getting current user
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.user,
    queryFn: () => authService.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook for user authentication status
 */
export const useAuthStatus = () => {
  return useQuery({
    queryKey: ['auth', 'status'],
    queryFn: () => authService.isAuthenticated(),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

/**
 * Hook for login mutation
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: LoginForm) => authService.login(credentials),
    onSuccess: (data) => {
      if (data.success && data.user) {
        // Update user query cache
        queryClient.setQueryData(AUTH_QUERY_KEYS.user, data.user);
        // Invalidate auth status
        queryClient.invalidateQueries({ queryKey: ['auth', 'status'] });
      }
    },
  });
};

/**
 * Hook for logout mutation
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear all auth-related cache
      queryClient.removeQueries({ queryKey: ['auth'] });
      queryClient.clear();
    },
  });
};

/**
 * Hook for getting user profiles
 */
export const useProfiles = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.profiles,
    queryFn: () => authService.getProfiles(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook for creating profile
 */
export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ name, avatar }: { name: string; avatar?: string }) =>
      authService.createProfile(name, avatar),
    onSuccess: () => {
      // Invalidate profiles query to refetch
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.profiles });
    },
  });
};

/**
 * Hook for getting current profile
 */
export const useCurrentProfile = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.currentProfile,
    queryFn: () => authService.getCurrentProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook for selecting profile
 */
export const useSelectProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (profile: Profile) => authService.selectProfile(profile),
    onSuccess: (_, profile) => {
      // Update current profile cache
      queryClient.setQueryData(AUTH_QUERY_KEYS.currentProfile, profile);
    },
  });
};

/**
 * Hook for getting service plan
 */
export const useServicePlan = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.servicePlan,
    queryFn: () => authService.getServicePlan(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook for selecting service plan
 */
export const useSelectServicePlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (plan: ServicePlan) => authService.selectServicePlan(plan),
    onSuccess: (_, plan) => {
      // Update service plan cache
      queryClient.setQueryData(AUTH_QUERY_KEYS.servicePlan, plan);
    },
  });
};

/**
 * Hook for onboarding status
 */
export const useOnboardingStatus = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.onboardingStatus,
    queryFn: () => authService.hasCompletedOnboarding(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook for completing onboarding
 */
export const useCompleteOnboarding = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authService.completeOnboarding(),
    onSuccess: () => {
      // Update onboarding status cache
      queryClient.setQueryData(AUTH_QUERY_KEYS.onboardingStatus, true);
    },
  });
};

/**
 * Hook for token refresh
 */
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: () => authService.refreshToken(),
  });
};