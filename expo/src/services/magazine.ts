import { contentsService } from './contents';
import { zonesService } from './zones';
import { Magazine, PaginatedResponse, ApiResponse, Content, Zone } from '../types';

/**
 * Magazine service for handling magazine-related API calls
 */
export class MagazineService {
  /**
   * Get paginated list of magazines (using contents from first zone)
   */
  async getMagazines(page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<Magazine>>> {
    try {
      // Get zones first
      const zones = await zonesService.fetchZones();
      if (zones.length === 0) {
        return {
          success: false,
          error: 'No zones available',
        };
      }

      // Get contents from the first zone
      const firstZone = zones[0];
      const contents = await contentsService.fetchContents(firstZone.id, page, limit);
      
      // Convert contents to magazines format
      const magazines: Magazine[] = contents.map((content: Content) => ({
        id: content.id,
        title: content.title,
        issue: `Số ${content.id}`,
        date: new Date(content.publishedAt).toLocaleDateString('vi-VN'),
        cover: content.image || 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop',
        isLatest: false,
        description: content.description,
        content: content.content,
        category: firstZone.name.toLowerCase(),
      }));

      // Mark the first one as latest
      if (magazines.length > 0 && page === 1) {
        magazines[0].isLatest = true;
      }

      return {
        success: true,
        data: {
          data: magazines,
          total: magazines.length * 10, // Estimate total
          page,
          limit,
          hasMore: magazines.length === limit,
        },
      };
    } catch (error) {
      console.error('Error getting magazines:', error);
      return {
        success: false,
        error: 'Failed to fetch magazines',
      };
    }
  }

  /**
   * Get magazine by ID (using content detail)
   */
  async getMagazineById(id: string): Promise<ApiResponse<Magazine>> {
    try {
      const content = await contentsService.fetchContentDetail(id);
      if (!content) {
        return {
          success: false,
          error: 'Magazine not found',
        };
      }

      const magazine: Magazine = {
        id: content.id,
        title: content.title,
        issue: `Số ${content.id}`,
        date: new Date(content.publishedAt).toLocaleDateString('vi-VN'),
        cover: content.image || 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop',
        isLatest: false,
        description: content.description,
        content: content.content,
        category: 'science',
      };

      return {
        success: true,
        data: magazine,
      };
    } catch (error) {
      console.error('Error getting magazine by ID:', error);
      return {
        success: false,
        error: 'Failed to fetch magazine',
      };
    }
  }

  /**
   * Get latest magazines (using most read contents)
   */
  async getLatestMagazines(limit = 10): Promise<ApiResponse<Magazine[]>> {
    try {
      // Get zones first
      const zones = await zonesService.fetchZones();
      if (zones.length === 0) {
        return {
          success: false,
          error: 'No zones available',
        };
      }

      // Get most read contents from the first zone
      const firstZone = zones[0];
      const contents = await contentsService.fetchMostReadContents(firstZone.id, limit);
      
      // Convert contents to magazines format
      const magazines: Magazine[] = contents.map((content: Content) => ({
        id: content.id,
        title: content.title,
        issue: `Số ${content.id}`,
        date: new Date(content.publishedAt).toLocaleDateString('vi-VN'),
        cover: content.image || 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop',
        isLatest: true,
        description: content.description,
        content: content.content,
        category: firstZone.name.toLowerCase(),
      }));

      return {
        success: true,
        data: magazines,
      };
    } catch (error) {
      console.error('Error getting latest magazines:', error);
      return {
        success: false,
        error: 'Failed to fetch latest magazines',
      };
    }
  }

  /**
   * Get popular magazines
   */
  async getPopularMagazines(limit = 10): Promise<ApiResponse<Magazine[]>> {
    try {
      // Mock popular magazines
      const mockPopular: Magazine[] = [
        {
          id: '4',
          title: 'Khoa học và Đời sống',
          issue: 'số 18',
          date: '1/5/2025',
          cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
          description: 'Số đặc biệt về AI và Machine Learning',
          category: 'technology',
        },
        {
          id: '5',
          title: 'Khoa học và Đời sống',
          issue: 'số 16',
          date: '1/5/2025',
          cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
          description: 'Khám phá vũ trụ và thiên văn học',
          category: 'astronomy',
        },
        {
          id: '6',
          title: 'Khoa học và Đời sống',
          issue: 'số 14',
          date: '3/4/2025',
          cover: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=300&h=400&fit=crop',
          description: 'Y học hiện đại và sức khỏe',
          category: 'medicine',
        },
      ];

      return {
        success: true,
        data: mockPopular.slice(0, limit),
      };
    } catch (error) {
      console.error('Error getting popular magazines:', error);
      return {
        success: false,
        error: 'Failed to fetch popular magazines',
      };
    }
  }

  /**
   * Search magazines (using content search)
   */
  async searchMagazines(
    query: string,
    page = 1,
    limit = 20
  ): Promise<ApiResponse<PaginatedResponse<Magazine>>> {
    try {
      // Get zones first
      const zones = await zonesService.fetchZones();
      if (zones.length === 0) {
        return {
          success: false,
          error: 'No zones available',
        };
      }

      // Search contents from the first zone
      const firstZone = zones[0];
      const contents = await contentsService.searchContents(query, page, limit, firstZone.id);
      
      // Convert contents to magazines format
      const magazines: Magazine[] = contents.map((content: Content) => ({
        id: content.id,
        title: content.title,
        issue: `Số ${content.id}`,
        date: new Date(content.publishedAt).toLocaleDateString('vi-VN'),
        cover: content.image || 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop',
        isLatest: false,
        description: content.description,
        content: content.content,
        category: firstZone.name.toLowerCase(),
      }));

      return {
        success: true,
        data: {
          data: magazines,
          total: magazines.length * 10, // Estimate total
          page,
          limit,
          hasMore: magazines.length === limit,
        },
      };
    } catch (error) {
      console.error('Error searching magazines:', error);
      return {
        success: false,
        error: 'Failed to search magazines',
      };
    }
  }

  /**
   * Get magazines by category
   */
  async getMagazinesByCategory(
    category: string,
    page = 1,
    limit = 20
  ): Promise<ApiResponse<PaginatedResponse<Magazine>>> {
    try {
      const allMagazines = await this.getMagazines(1, 100);
      if (!allMagazines.success || !allMagazines.data) {
        return {
          success: false,
          error: 'Failed to fetch magazines by category',
        };
      }

      const filteredMagazines = allMagazines.data.data.filter(
        (magazine) => magazine.category === category
      );

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedResults = filteredMagazines.slice(startIndex, endIndex);

      return {
        success: true,
        data: {
          data: paginatedResults,
          total: filteredMagazines.length,
          page,
          limit,
          hasMore: endIndex < filteredMagazines.length,
        },
      };
    } catch (error) {
      console.error('Error getting magazines by category:', error);
      return {
        success: false,
        error: 'Failed to fetch magazines by category',
      };
    }
  }
}

export const magazineService = new MagazineService();