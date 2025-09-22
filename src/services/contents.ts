import { API } from './api';
import { Content } from '../types';
import { 
  getMockContents, 
  getMockMostReadContents, 
  searchMockContents, 
  getMockContentDetail 
} from '../data/mockData';
import { DATA_CONFIG } from '../constants/config';

/**
 * Contents service for handling content-related API calls
 */
export class ContentsService {
  /**
   * Fetch contents by zone
   */
  async fetchContents(zoneId: string, pageIndex = 1, pageSize = 10): Promise<Content[]> {
    if (DATA_CONFIG.USE_MOCK_DATA) {
      console.log(`Using mock contents data for zone: ${zoneId}`);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, DATA_CONFIG.MOCK_API_DELAY.LONG));
      return getMockContents(zoneId, pageIndex, pageSize);
    }

    try {
      const url = `morenews-zone-${zoneId}-${pageIndex}.html?page_size=${pageSize}`;
      const response = await API.get<{ data?: { contents?: Content[] } }>(url);
      return response.data?.contents || [];
    } catch (error) {
      console.error('Error fetching contents:', error);
      return [];
    }
  }

  /**
   * Fetch most read contents by zone
   */
  async fetchMostReadContents(zoneId: string, pageSize = 10): Promise<Content[]> {
    if (DATA_CONFIG.USE_MOCK_DATA) {
      console.log(`Using mock most read contents for zone: ${zoneId}`);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, DATA_CONFIG.MOCK_API_DELAY.MEDIUM));
      return getMockMostReadContents(zoneId, pageSize);
    }

    try {
      const url = `morenews-mostread-${zoneId}-1.html?page_size=${pageSize}`;
      const response = await API.get<{ data?: { contents?: Content[] } }>(url);
      return response.data?.contents || [];
    } catch (error) {
      console.error('Error fetching most read contents:', error);
      return [];
    }
  }

  /**
   * Search contents
   */
  async searchContents(query: string, pageIndex = 1, pageSize = 10, defaultZoneId = '1'): Promise<Content[]> {
    if (DATA_CONFIG.USE_MOCK_DATA) {
      console.log(`Using mock search for query: ${query}`);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, DATA_CONFIG.MOCK_API_DELAY.LONG));
      return searchMockContents(query, pageIndex, pageSize);
    }

    try {
      const url = `morenews-search-${defaultZoneId}-${pageIndex}.html?phrase=${encodeURIComponent(query)}&page_size=${pageSize}&is_empty=1&subsite=1`;
      const response = await API.get<{ data?: { contents?: Content[] } }>(url);
      return response.data?.contents || [];
    } catch (error) {
      console.error('Error searching contents:', error);
      return [];
    }
  }

  /**
   * Fetch content detail by ID
   */
  async fetchContentDetail(contentId: string): Promise<Content | null> {
    if (DATA_CONFIG.USE_MOCK_DATA) {
      console.log(`Using mock content detail for ID: ${contentId}`);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, DATA_CONFIG.MOCK_API_DELAY.SHORT));
      return getMockContentDetail(contentId);
    }

    try {
      const response = await API.get<{ data?: { content?: Content } }>(`contents/get/by-id?object_id=${contentId}`);
      return response.data?.content || null;
    } catch (error) {
      console.error('Error fetching content detail:', error);
      return null;
    }
  }
}

export const contentsService = new ContentsService();

// Export the API functions for direct use
export async function fetchContents(zoneId: string, pageIndex = 1, pageSize = 10): Promise<Content[]> {
  return contentsService.fetchContents(zoneId, pageIndex, pageSize);
}

export async function fetchMostReadContents(zoneId: string, pageSize = 10): Promise<Content[]> {
  return contentsService.fetchMostReadContents(zoneId, pageSize);
}

export async function searchContents(query: string, pageIndex = 1, pageSize = 10, defaultZoneId = '1'): Promise<Content[]> {
  return contentsService.searchContents(query, pageIndex, pageSize, defaultZoneId);
}

export async function fetchContentDetail(contentId: string): Promise<Content | null> {
  return contentsService.fetchContentDetail(contentId);
}