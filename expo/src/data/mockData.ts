import { Magazine, SocialLink, Zone, Content, User } from '../types';

/**
 * Mock data for development and testing
 * This data structure matches the API responses for easy switching
 */

// Mock Zones Data
export const mockZones: Zone[] = [
  {
    id: '1',
    name: 'Khoa học & Công nghệ',
    description: 'Tin tức và bài viết về khoa học, công nghệ mới nhất',
    order: 1,
  },
  {
    id: '2',
    name: 'Y tế & Sức khỏe',
    description: 'Thông tin y tế, sức khỏe và chăm sóc bản thân',
    order: 2,
  },
  {
    id: '3',
    name: 'Giáo dục',
    description: 'Tin tức giáo dục, học tập và phát triển kỹ năng',
    order: 3,
  },
  {
    id: '4',
    name: 'Môi trường',
    description: 'Bảo vệ môi trường và phát triển bền vững',
    order: 4,
  },
  {
    id: '5',
    name: 'Thiên văn học',
    description: 'Khám phá vũ trụ và những bí ẩn của không gian',
    order: 5,
  },
];

// Mock Contents Data
export const mockContents: Content[] = [
  {
    id: '1',
    title: 'Trí tuệ nhân tạo và tương lai của y học',
    description: 'AI đang thay đổi cách chúng ta chẩn đoán và điều trị bệnh',
    content: 'Nội dung chi tiết về AI trong y học...',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    publishedAt: '2025-01-15T10:00:00Z',
    zoneId: '1',
    author: 'Dr. Nguyễn Văn A',
    tags: ['AI', 'Y học', 'Công nghệ'],
    viewCount: 1250,
    isPopular: true,
  },
  {
    id: '2',
    title: 'Khám phá hành tinh mới giống Trái Đất',
    description: 'Các nhà khoa học phát hiện hành tinh có thể có sự sống',
    content: 'Chi tiết về hành tinh mới được phát hiện...',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
    publishedAt: '2025-01-14T15:30:00Z',
    zoneId: '5',
    author: 'GS. Trần Thị B',
    tags: ['Thiên văn', 'Hành tinh', 'Khám phá'],
    viewCount: 980,
    isPopular: true,
  },
  {
    id: '3',
    title: 'Vaccine mRNA mới chống ung thư',
    description: 'Thử nghiệm lâm sàng cho kết quả khả quan',
    content: 'Thông tin về vaccine mRNA chống ung thư...',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    publishedAt: '2025-01-13T09:15:00Z',
    zoneId: '2',
    author: 'BS. Lê Văn C',
    tags: ['Vaccine', 'Ung thư', 'Y tế'],
    viewCount: 1500,
    isPopular: true,
  },
  {
    id: '4',
    title: 'Giáo dục STEM trong thời đại số',
    description: 'Cách tiếp cận mới trong giảng dạy khoa học',
    content: 'Phương pháp giáo dục STEM hiện đại...',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    publishedAt: '2025-01-12T14:20:00Z',
    zoneId: '3',
    author: 'ThS. Phạm Thị D',
    tags: ['STEM', 'Giáo dục', 'Công nghệ'],
    viewCount: 750,
    isPopular: false,
  },
  {
    id: '5',
    title: 'Năng lượng tái tạo và biến đổi khí hậu',
    description: 'Giải pháp xanh cho tương lai bền vững',
    content: 'Tầm quan trọng của năng lượng tái tạo...',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop',
    publishedAt: '2025-01-11T11:45:00Z',
    zoneId: '4',
    author: 'KS. Hoàng Văn E',
    tags: ['Năng lượng', 'Môi trường', 'Khí hậu'],
    viewCount: 620,
    isPopular: false,
  },
  {
    id: '6',
    title: 'Quantum Computing: Cuộc cách mạng tính toán',
    description: 'Máy tính lượng tử sẽ thay đổi thế giới như thế nào',
    content: 'Tìm hiểu về công nghệ quantum computing...',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    publishedAt: '2025-01-10T16:00:00Z',
    zoneId: '1',
    author: 'TS. Vũ Thị F',
    tags: ['Quantum', 'Tính toán', 'Công nghệ'],
    viewCount: 890,
    isPopular: false,
  },
  {
    id: '7',
    title: 'Liệu pháp gen điều trị bệnh hiếm',
    description: 'Hy vọng mới cho bệnh nhân mắc bệnh di truyền',
    content: 'Tiến bộ trong liệu pháp gen...',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
    publishedAt: '2025-01-09T13:30:00Z',
    zoneId: '2',
    author: 'PGS. Đỗ Văn G',
    tags: ['Gen', 'Điều trị', 'Y học'],
    viewCount: 1100,
    isPopular: true,
  },
  {
    id: '8',
    title: 'Sao Hỏa: Tìm kiếm dấu vết sự sống',
    description: 'Rover mới nhất gửi về dữ liệu quan trọng',
    content: 'Khám phá mới nhất trên sao Hỏa...',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=300&fit=crop',
    publishedAt: '2025-01-08T08:15:00Z',
    zoneId: '5',
    author: 'Dr. Ngô Thị H',
    tags: ['Sao Hỏa', 'Không gian', 'Sự sống'],
    viewCount: 1350,
    isPopular: true,
  },
];

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'user1',
    email: 'user1@example.com',
    fullName: 'Nguyễn Văn A',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: '2',
    username: 'user2',
    email: 'user2@example.com',
    fullName: 'Trần Thị B',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2025-01-14T15:30:00Z',
  },
];

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

// Mock API functions for Zones
export const getMockZones = (): Zone[] => {
  return mockZones;
};

// Mock API functions for Contents
export const getMockContents = (zoneId?: string, pageIndex = 1, pageSize = 10): Content[] => {
  let filteredContents = mockContents;
  
  if (zoneId) {
    filteredContents = mockContents.filter(content => content.zoneId === zoneId);
  }
  
  const startIndex = (pageIndex - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return filteredContents.slice(startIndex, endIndex);
};

export const getMockMostReadContents = (zoneId?: string, pageSize = 10): Content[] => {
  let filteredContents = mockContents;
  
  if (zoneId) {
    filteredContents = mockContents.filter(content => content.zoneId === zoneId);
  }
  
  return filteredContents
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, pageSize);
};

export const getMockPopularContents = (pageSize = 10): Content[] => {
  return mockContents
    .filter(content => content.isPopular)
    .slice(0, pageSize);
};

export const searchMockContents = (query: string, pageIndex = 1, pageSize = 10): Content[] => {
  const lowercaseQuery = query.toLowerCase();
  const filteredContents = mockContents.filter(
    content =>
      content.title.toLowerCase().includes(lowercaseQuery) ||
      content.description?.toLowerCase().includes(lowercaseQuery) ||
      content.author?.toLowerCase().includes(lowercaseQuery) ||
      content.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
  
  const startIndex = (pageIndex - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return filteredContents.slice(startIndex, endIndex);
};

export const getMockContentDetail = (contentId: string): Content | null => {
  return mockContents.find(content => content.id === contentId) || null;
};

// Mock API functions for Users
export const mockLogin = async (email: string, password: string): Promise<User | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple mock validation
  if (email === 'test@example.com' && password === 'password') {
    return mockUsers[0];
  }
  
  return null;
};

export const mockRegister = async (email: string, password: string, username: string, fullName: string): Promise<User | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Create new mock user
  const newUser: User = {
    id: Date.now().toString(),
    username,
    email,
    fullName,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  return newUser;
};

export const mockGetUserInfo = async (token: string): Promise<User | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return first mock user for any valid token
  if (token) {
    return mockUsers[0];
  }
  
  return null;
};

export const mockUpdateProfile = async (token: string, profileData: any): Promise<User | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (token) {
    return {
      ...mockUsers[0],
      ...profileData,
      updatedAt: new Date().toISOString(),
    };
  }
  
  return null;
};

export const mockResetPassword = async (email: string): Promise<any> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    message: 'Password reset email sent successfully',
  };
};

export const mockSignOut = async (token: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log('User signed out successfully');
};