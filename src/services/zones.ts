import { API } from './api';
import { Zone } from '../types';

/**
 * Zones service for handling zone-related API calls
 */
export class ZonesService {
  /**
   * Fetch zones from API
   */
  async fetchZones(): Promise<Zone[]> {
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