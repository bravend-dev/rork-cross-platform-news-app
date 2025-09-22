import { API_CONFIG } from '@/constants/config';
import { ApiResponse, PaginatedResponse } from '@/types';

/**
 * Base API service with common functionality
 */
class ApiService {
  private baseUrl: string;
  private timeout: number;
  private retryAttempts: number;

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
    this.timeout = API_CONFIG.timeout;
    this.retryAttempts = API_CONFIG.retryAttempts;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    attempt = 1
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (attempt < this.retryAttempts && error instanceof Error && error.name !== 'AbortError') {
        console.log(`Retrying request to ${endpoint}, attempt ${attempt + 1}`);
        return this.request(endpoint, options, attempt + 1);
      }

      console.error(`API request failed: ${endpoint}`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  setAuthToken(token: string): void {
    // This would typically be handled by an interceptor
    // For now, we'll store it and add to headers manually
  }

  clearAuthToken(): void {
    // Clear stored token
  }
}

export const apiService = new ApiService();

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
  },
  magazines: {
    list: '/magazines',
    detail: (id: string) => `/magazines/${id}`,
    latest: '/magazines/latest',
    popular: '/magazines/popular',
    search: '/magazines/search',
  },
  profiles: {
    list: '/profiles',
    create: '/profiles',
    update: (id: string) => `/profiles/${id}`,
    delete: (id: string) => `/profiles/${id}`,
  },
  subscriptions: {
    plans: '/subscriptions/plans',
    subscribe: '/subscriptions/subscribe',
    cancel: '/subscriptions/cancel',
    status: '/subscriptions/status',
  },
} as const;

/**
 * Helper function for paginated requests
 */
export const getPaginatedData = async <T>(
  endpoint: string,
  page = 1,
  limit = 20
): Promise<ApiResponse<PaginatedResponse<T>>> => {
  const url = `${endpoint}?page=${page}&limit=${limit}`;
  return apiService.get<PaginatedResponse<T>>(url);
};