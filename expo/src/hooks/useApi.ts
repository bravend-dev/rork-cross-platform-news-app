import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { zonesService } from '../services/zones';
import { contentsService } from '../services/contents';
import { userService } from '../services/user';
import { UpdateProfileForm } from '../types';

// Query keys
export const QUERY_KEYS = {
  zones: ['zones'] as const,
  contents: (zoneId: string, pageIndex: number, pageSize: number) => ['contents', zoneId, pageIndex, pageSize] as const,
  mostReadContents: (zoneId: string, pageSize: number) => ['mostReadContents', zoneId, pageSize] as const,
  searchContents: (query: string, pageIndex: number, pageSize: number, zoneId: string) => ['searchContents', query, pageIndex, pageSize, zoneId] as const,
  contentDetail: (contentId: string) => ['contentDetail', contentId] as const,
  userInfo: (token: string) => ['userInfo', token] as const,
} as const;

// Zones hooks
export function useZones() {
  return useQuery({
    queryKey: QUERY_KEYS.zones,
    queryFn: () => zonesService.fetchZones(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Contents hooks
export function useContents(zoneId: string, pageIndex = 1, pageSize = 10) {
  return useQuery({
    queryKey: QUERY_KEYS.contents(zoneId, pageIndex, pageSize),
    queryFn: () => contentsService.fetchContents(zoneId, pageIndex, pageSize),
    enabled: !!zoneId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useMostReadContents(zoneId: string, pageSize = 10) {
  return useQuery({
    queryKey: QUERY_KEYS.mostReadContents(zoneId, pageSize),
    queryFn: () => contentsService.fetchMostReadContents(zoneId, pageSize),
    enabled: !!zoneId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSearchContents(query: string, pageIndex = 1, pageSize = 10, defaultZoneId = '1') {
  return useQuery({
    queryKey: QUERY_KEYS.searchContents(query, pageIndex, pageSize, defaultZoneId),
    queryFn: () => contentsService.searchContents(query, pageIndex, pageSize, defaultZoneId),
    enabled: !!query.trim(),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

export function useContentDetail(contentId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.contentDetail(contentId),
    queryFn: () => contentsService.fetchContentDetail(contentId),
    enabled: !!contentId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// User hooks
export function useUserInfo(token: string) {
  return useQuery({
    queryKey: QUERY_KEYS.userInfo(token),
    queryFn: () => userService.getInfo(token),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Mutation hooks
export function useRegisterMutation() {
  return useMutation({
    mutationFn: ({ email, password, username, fullName, fingerprint }: {
      email: string;
      password: string;
      username: string;
      fullName: string;
      fingerprint?: string;
    }) => userService.register(email, password, username, fullName, fingerprint),
  });
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: ({ email, password, fingerprint }: {
      email: string;
      password: string;
      fingerprint?: string;
    }) => userService.login(email, password, fingerprint),
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ token, profileData }: { token: string; profileData: UpdateProfileForm }) =>
      userService.updateProfile(token, profileData),
    onSuccess: (data, variables) => {
      // Invalidate user info query to refetch updated data
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userInfo(variables.token) });
    },
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (email: string) => userService.resetPassword(email),
  });
}

export function useSignOutMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (token: string) => userService.signOut(token),
    onSuccess: () => {
      // Clear all queries on sign out
      queryClient.clear();
    },
  });
}