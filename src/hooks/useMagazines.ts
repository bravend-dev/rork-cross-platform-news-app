import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { magazineService } from '@/services/magazine';
import { PAGINATION } from '@/constants/config';

/**
 * Query keys for magazine-related queries
 */
export const MAGAZINE_QUERY_KEYS = {
  all: ['magazines'] as const,
  lists: () => [...MAGAZINE_QUERY_KEYS.all, 'list'] as const,
  list: (page: number, limit: number) => [...MAGAZINE_QUERY_KEYS.lists(), page, limit] as const,
  details: () => [...MAGAZINE_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...MAGAZINE_QUERY_KEYS.details(), id] as const,
  latest: () => [...MAGAZINE_QUERY_KEYS.all, 'latest'] as const,
  popular: () => [...MAGAZINE_QUERY_KEYS.all, 'popular'] as const,
  search: (query: string) => [...MAGAZINE_QUERY_KEYS.all, 'search', query] as const,
  category: (category: string) => [...MAGAZINE_QUERY_KEYS.all, 'category', category] as const,
} as const;

/**
 * Hook for getting paginated magazines
 */
export const useMagazines = (page = 1, limit = PAGINATION.defaultLimit) => {
  return useQuery({
    queryKey: MAGAZINE_QUERY_KEYS.list(page, limit),
    queryFn: () => magazineService.getMagazines(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
  });
};

/**
 * Hook for infinite scroll magazines
 */
export const useInfiniteMagazines = (limit = PAGINATION.defaultLimit) => {
  return useInfiniteQuery({
    queryKey: [...MAGAZINE_QUERY_KEYS.lists(), 'infinite', limit],
    queryFn: ({ pageParam = 1 }) => magazineService.getMagazines(pageParam, limit),
    getNextPageParam: (lastPage) => {
      if (!lastPage.success || !lastPage.data) return undefined;
      return lastPage.data.hasMore ? lastPage.data.page + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook for getting magazine by ID
 */
export const useMagazine = (id: string) => {
  return useQuery({
    queryKey: MAGAZINE_QUERY_KEYS.detail(id),
    queryFn: () => magazineService.getMagazineById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook for getting latest magazines
 */
export const useLatestMagazines = (limit = 10) => {
  return useQuery({
    queryKey: [...MAGAZINE_QUERY_KEYS.latest(), limit],
    queryFn: () => magazineService.getLatestMagazines(limit),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook for getting popular magazines
 */
export const usePopularMagazines = (limit = 10) => {
  return useQuery({
    queryKey: [...MAGAZINE_QUERY_KEYS.popular(), limit],
    queryFn: () => magazineService.getPopularMagazines(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook for searching magazines
 */
export const useSearchMagazines = (query: string, page = 1, limit = PAGINATION.defaultLimit) => {
  return useQuery({
    queryKey: [...MAGAZINE_QUERY_KEYS.search(query), page, limit],
    queryFn: () => magazineService.searchMagazines(query, page, limit),
    enabled: query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
  });
};

/**
 * Hook for infinite scroll search
 */
export const useInfiniteSearchMagazines = (query: string, limit = PAGINATION.defaultLimit) => {
  return useInfiniteQuery({
    queryKey: [...MAGAZINE_QUERY_KEYS.search(query), 'infinite', limit],
    queryFn: ({ pageParam = 1 }) => magazineService.searchMagazines(query, pageParam, limit),
    getNextPageParam: (lastPage) => {
      if (!lastPage.success || !lastPage.data) return undefined;
      return lastPage.data.hasMore ? lastPage.data.page + 1 : undefined;
    },
    enabled: query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook for getting magazines by category
 */
export const useMagazinesByCategory = (
  category: string,
  page = 1,
  limit = PAGINATION.defaultLimit
) => {
  return useQuery({
    queryKey: [...MAGAZINE_QUERY_KEYS.category(category), page, limit],
    queryFn: () => magazineService.getMagazinesByCategory(category, page, limit),
    enabled: !!category,
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
  });
};

/**
 * Hook for infinite scroll by category
 */
export const useInfiniteMagazinesByCategory = (category: string, limit = PAGINATION.defaultLimit) => {
  return useInfiniteQuery({
    queryKey: [...MAGAZINE_QUERY_KEYS.category(category), 'infinite', limit],
    queryFn: ({ pageParam = 1 }) =>
      magazineService.getMagazinesByCategory(category, pageParam, limit),
    getNextPageParam: (lastPage) => {
      if (!lastPage.success || !lastPage.data) return undefined;
      return lastPage.data.hasMore ? lastPage.data.page + 1 : undefined;
    },
    enabled: !!category,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};