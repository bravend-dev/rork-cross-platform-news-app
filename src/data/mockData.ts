import { Magazine, SocialLink } from '@/types';

/**
 * Mock data for development and testing
 */

export const mockMagazines: Magazine[] = [
  {
    id: '1',
    title: 'Khoa học và Đời sống',
    issue: 'số 33',
    date: '14/8/2025',
    cover: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop',
    isLatest: true,
    description: 'Tạp chí khoa học hàng đầu Việt Nam với những bài viết chất lượng cao về khoa học và công nghệ.',
    content: 'Nội dung chi tiết của tạp chí số 33...',
    category: 'science',
  },
  {
    id: '2',
    title: 'Khoa học và Đời sống',
    issue: 'số 32',
    date: '7/8/2025',
    cover: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=400&fit=crop',
    description: 'Khám phá những điều kỳ diệu của khoa học trong cuộc sống hàng ngày.',
    content: 'Nội dung chi tiết của tạp chí số 32...',
    category: 'science',
  },
  {
    id: '3',
    title: 'Khoa học và Đời sống',
    issue: 'số 31',
    date: '31/7/2025',
    cover: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=300&h=400&fit=crop',
    description: 'Ứng dụng khoa học trong cuộc sống và tương lai của công nghệ.',
    content: 'Nội dung chi tiết của tạp chí số 31...',
    category: 'science',
  },
  {
    id: '4',
    title: 'Khoa học và Đời sống',
    issue: 'số 18',
    date: '1/5/2025',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
    description: 'Số đặc biệt về AI và Machine Learning - Tương lai của trí tuệ nhân tạo.',
    content: 'Nội dung chi tiết về AI và Machine Learning...',
    category: 'technology',
  },
  {
    id: '5',
    title: 'Khoa học và Đời sống',
    issue: 'số 16',
    date: '1/5/2025',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    description: 'Khám phá vũ trụ và thiên văn học - Những bí ẩn của không gian.',
    content: 'Nội dung chi tiết về thiên văn học...',
    category: 'astronomy',
  },
  {
    id: '6',
    title: 'Khoa học và Đời sống',
    issue: 'số 14',
    date: '3/4/2025',
    cover: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=300&h=400&fit=crop',
    description: 'Y học hiện đại và sức khỏe - Những tiến bộ mới trong điều trị.',
    content: 'Nội dung chi tiết về y học hiện đại...',
    category: 'medicine',
  },
];

export const mockSocialLinks: SocialLink[] = [
  {
    id: '1',
    name: 'Trí thức & Cuộc sống',
    platform: 'facebook',
    color: '#1877f2',
    url: 'https://facebook.com/trithuecuocsong',
  },
  {
    id: '2',
    name: 'Trí thức & Cuộc sống',
    platform: 'tiktok',
    color: '#000',
    url: 'https://tiktok.com/@trithuecuocsong',
  },
  {
    id: '3',
    name: 'VIETNAM DAILY',
    platform: 'facebook',
    color: '#1877f2',
    url: 'https://facebook.com/vietnamdaily',
  },
  {
    id: '4',
    name: 'VIETNAM DAILY',
    platform: 'tiktok',
    color: '#000',
    url: 'https://tiktok.com/@vietnamdaily',
  },
  {
    id: '5',
    name: 'KHOA HỌC & ĐỜI SỐNG',
    platform: 'facebook',
    color: '#1877f2',
    url: 'https://facebook.com/khoahocvadoisong',
  },
];

export const mockCategories = [
  { id: 'science', name: 'Khoa học', icon: '🔬' },
  { id: 'technology', name: 'Công nghệ', icon: '💻' },
  { id: 'medicine', name: 'Y học', icon: '⚕️' },
  { id: 'astronomy', name: 'Thiên văn', icon: '🌟' },
  { id: 'environment', name: 'Môi trường', icon: '🌱' },
  { id: 'education', name: 'Giáo dục', icon: '📚' },
];

/**
 * Get magazines by category
 */
export const getMagazinesByCategory = (category: string): Magazine[] => {
  return mockMagazines.filter(magazine => magazine.category === category);
};

/**
 * Get latest magazines
 */
export const getLatestMagazines = (limit = 10): Magazine[] => {
  return mockMagazines
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

/**
 * Get popular magazines (mock implementation)
 */
export const getPopularMagazines = (limit = 10): Magazine[] => {
  // Mock popularity by shuffling and taking first items
  const shuffled = [...mockMagazines].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
};

/**
 * Search magazines
 */
export const searchMagazines = (query: string): Magazine[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockMagazines.filter(
    magazine =>
      magazine.title.toLowerCase().includes(lowercaseQuery) ||
      magazine.issue.toLowerCase().includes(lowercaseQuery) ||
      magazine.description?.toLowerCase().includes(lowercaseQuery) ||
      magazine.category?.toLowerCase().includes(lowercaseQuery)
  );
};