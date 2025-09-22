import { apiService, API_ENDPOINTS, getPaginatedData } from './api';
import { Magazine, PaginatedResponse, ApiResponse } from '@/types';

/**
 * Magazine service for handling magazine-related API calls
 */
export class MagazineService {
  /**
   * Get paginated list of magazines
   */
  async getMagazines(page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<Magazine>>> {
    try {
      // For now, return mock data
      // Replace with actual API call when backend is ready
      const mockMagazines: Magazine[] = [
        {
          id: '1',
          title: 'Khoa học và Đời sống',
          issue: 'số 33',
          date: '14/8/2025',
          cover: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop',
          isLatest: true,
          description: 'Tạp chí khoa học hàng đầu Việt Nam',
          category: 'science',
        },
        {
          id: '2',
          title: 'Khoa học và Đời sống',
          issue: 'số 32',
          date: '7/8/2025',
          cover: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=400&fit=crop',
          description: 'Khám phá những điều kỳ diệu của khoa học',
          category: 'science',
        },
        {
          id: '3',
          title: 'Khoa học và Đời sống',
          issue: 'số 31',
          date: '31/7/2025',
          cover: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=300&h=400&fit=crop',
          description: 'Ứng dụng khoa học trong cuộc sống',
          category: 'science',
        },
      ];

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = mockMagazines.slice(startIndex, endIndex);

      return {
        success: true,
        data: {
          data: paginatedData,
          total: mockMagazines.length,
          page,
          limit,
          hasMore: endIndex < mockMagazines.length,
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
   * Get magazine by ID
   */
  async getMagazineById(id: string): Promise<ApiResponse<Magazine>> {
    try {
      // Mock data for now
      const mockMagazine: Magazine = {
        id,
        title: 'Khoa học và Đời sống',
        issue: 'số 33',
        date: '14/8/2025',
        cover: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop',
        isLatest: true,
        description: 'Tạp chí khoa học hàng đầu Việt Nam với những bài viết chất lượng cao về khoa học và công nghệ.',
        content: 'Nội dung chi tiết của tạp chí...',
        category: 'science',
      };

      return {
        success: true,
        data: mockMagazine,
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
   * Get latest magazines
   */
  async getLatestMagazines(limit = 10): Promise<ApiResponse<Magazine[]>> {
    try {
      const response = await this.getMagazines(1, limit);
      if (response.success && response.data) {
        return {
          success: true,
          data: response.data.data,
        };
      }
      return {
        success: false,
        error: 'Failed to fetch latest magazines',
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
   * Search magazines
   */
  async searchMagazines(
    query: string,
    page = 1,
    limit = 20
  ): Promise<ApiResponse<PaginatedResponse<Magazine>>> {
    try {
      // Mock search functionality
      const allMagazines = await this.getMagazines(1, 100);
      if (!allMagazines.success || !allMagazines.data) {
        return {
          success: false,
          error: 'Failed to search magazines',
        };
      }

      const filteredMagazines = allMagazines.data.data.filter(
        (magazine) =>
          magazine.title.toLowerCase().includes(query.toLowerCase()) ||
          magazine.issue.toLowerCase().includes(query.toLowerCase()) ||
          magazine.description?.toLowerCase().includes(query.toLowerCase())
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