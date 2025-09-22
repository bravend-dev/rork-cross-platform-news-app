import { API_CONFIG } from '../constants/config';
import { PaginatedResponse } from '../types';

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
  ): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}/${endpoint}`;
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
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (attempt < this.retryAttempts && error instanceof Error && error.name !== 'AbortError') {
        console.log(`Retrying request to ${endpoint}, attempt ${attempt + 1}`);
        return this.request(endpoint, options, attempt + 1);
      }

      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
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
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
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

// Create a singleton instance that matches your API structure
class APIClient {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.apiService.get<T>(endpoint, headers);
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: { headers?: Record<string, string> }
  ): Promise<T> {
    return this.apiService.post<T>(endpoint, data, options?.headers);
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: { headers?: Record<string, string> }
  ): Promise<T> {
    return this.apiService.put<T>(endpoint, data, options?.headers);
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.apiService.delete<T>(endpoint, headers);
  }
}

export const API = new APIClient();
export const apiService = new ApiService();

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  auth: {
    login: 'users/post/login',
    logout: 'users/post/logout',
    register: 'users/post/register',
    info: 'users/post/info',
    resetPassword: 'users/post/reset-password',
    updateProfile: 'users/post/update-profile',
  },
  zones: {
    getContentDetail: 'api/zone/get/content_detail',
  },
  contents: {
    getByZone: (zoneId: string, pageIndex: number) => `morenews-zone-${zoneId}-${pageIndex}.html`,
    getMostRead: (zoneId: string) => `morenews-mostread-${zoneId}-1.html`,
    search: (zoneId: string, pageIndex: number) => `morenews-search-${zoneId}-${pageIndex}.html`,
    getById: 'contents/get/by-id',
  },
} as const;

/**
 * Helper function for paginated requests
 */
export const getPaginatedData = async <T>(
  endpoint: string,
  page = 1,
  limit = 20
): Promise<PaginatedResponse<T>> => {
  const url = `${endpoint}?page=${page}&limit=${limit}`;
  return apiService.get<PaginatedResponse<T>>(url);
};