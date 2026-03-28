import { API } from './api';
import { Zone } from '../types';
import { getMockZones } from '../data/mockData';
import { DATA_CONFIG } from '../constants/config';

/**
 * Zones service for handling zone-related API calls
 */
export class ZonesService {
  /**
   * Fetch zones from API or mock data
   */
  async fetchZones(): Promise<Zone[]> {
    if (DATA_CONFIG.USE_MOCK_DATA) {
      console.log('Using mock zones data');
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, DATA_CONFIG.MOCK_API_DELAY.MEDIUM));
      return getMockZones();
    }

    try {
      const response = await API.get<{ data?: { zones?: Zone[] } }>('api/zone/get/content_detail?object_id=1');
      return response.data?.zones || [];
    } catch (error) {
      console.error('Error fetching zones:', error);
      return [];
    }
  }
}

export const zonesService = new ZonesService();

// Export the API function for direct use
export async function fetchZones(): Promise<Zone[]> {
  return zonesService.fetchZones();
}