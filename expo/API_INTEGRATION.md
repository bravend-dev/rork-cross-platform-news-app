# API Integration Guide

This document provides comprehensive information about integrating with the backend API and using mock data during development.

## Overview

The application uses a service-based architecture with a flexible mock data system that allows easy switching between mock data and real API calls. This approach enables development to continue even when the API is not ready.

## Mock Data System

### Configuration

The mock data system is controlled by a single configuration flag in `src/constants/config.ts`:

```typescript
export const DATA_CONFIG = {
  USE_MOCK_DATA: true, // Set to false when API is ready
  MOCK_API_DELAY: {
    SHORT: 400,
    MEDIUM: 600,
    LONG: 1000,
  },
} as const;
```

### Mock Data Structure

All mock data is centralized in `src/data/mockData.ts` and includes:

- **Zones**: News categories/sections
- **Contents**: News articles and content
- **Users**: User accounts and profiles
- **Magazines**: Magazine issues (legacy)

### Switching to API

To switch from mock data to real API calls:

1. Set `DATA_CONFIG.USE_MOCK_DATA = false` in `src/constants/config.ts`
2. Ensure your API endpoints match the expected structure
3. Update the base URL in `API_CONFIG.baseUrl`

## Service Architecture

### Base API Service

Location: `src/services/api.ts`

The base API service provides:
- Axios instance configuration
- Request/response interceptors
- Error handling
- Authentication token management
- Request timeout and retry logic

### Service Classes

#### ZonesService (`src/services/zones.ts`)
Handles news zones/categories:
- Fetch all zones
- Zone-based content filtering

#### ContentsService (`src/services/contents.ts`)
Manages content operations:
- Fetch contents by zone
- Most read contents
- Search functionality
- Content details

#### UserService (`src/services/user.ts`)
Handles user authentication and management:
- User registration
- Login/logout
- Profile management
- Password reset

## API Endpoints (When USE_MOCK_DATA = false)

### Zones

```typescript
// Get zones
GET /api/zone/get/content_detail?object_id=1
Response: { data: { zones: Zone[] } }
```

### Contents

```typescript
// Get contents by zone
GET /morenews-zone-{zoneId}-{pageIndex}.html?page_size={pageSize}
Response: { data: { contents: Content[] } }

// Get most read contents
GET /morenews-mostread-{zoneId}-1.html?page_size={pageSize}
Response: { data: { contents: Content[] } }

// Search contents
GET /morenews-search-{zoneId}-{pageIndex}.html?phrase={query}&page_size={pageSize}&is_empty=1&subsite=1
Response: { data: { contents: Content[] } }

// Get content detail
GET /contents/get/by-id?object_id={contentId}
Response: { data: { content: Content } }
```

### Users

```typescript
// Register
POST /users/post/register
Body: { email: string, password: string, username: string, fullname: string, fingerprint: string }
Response: { data: { user: User } }

// Login
POST /users/post/login
Body: { email: string, password: string, fingerprint: string }
Response: { data: { user: User } }

// Get user info
POST /users/post/info
Headers: { Authorization: Bearer <token> }
Response: { data: { user: User } }

// Update profile
POST /users/post/update-profile
Headers: { Authorization: Bearer <token> }
Body: UpdateProfileForm
Response: { data: { user: User } }

// Reset password
POST /users/post/reset-password
Body: { email: string }

// Logout
POST /users/post/logout
Headers: { Authorization: Bearer <token> }
```

## Usage Examples

### Using Services in Components

```typescript
import { useEffect, useState } from 'react';
import { fetchContents } from '@/services/contents';
import { Content } from '@/types';

export function ContentList({ zoneId }: { zoneId: string }) {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContents = async () => {
      try {
        const data = await fetchContents(zoneId, 1, 10);
        setContents(data);
      } catch (error) {
        console.error('Failed to fetch contents:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContents();
  }, [zoneId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {contents.map(content => (
        <div key={content.id}>
          <h3>{content.title}</h3>
          <p>{content.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Using React Query (Recommended)

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchContents } from '@/services/contents';

export function ContentList({ zoneId }: { zoneId: string }) {
  const { data: contents, isLoading, error } = useQuery({
    queryKey: ['contents', zoneId],
    queryFn: () => fetchContents(zoneId, 1, 10),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading contents</div>;

  return (
    <div>
      {contents?.map(content => (
        <div key={content.id}>
          <h3>{content.title}</h3>
          <p>{content.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Mock Login Credentials

When using mock data, use these test credentials:

```typescript
// From MOCK_CONFIG in src/constants/config.ts
const testCredentials = {
  email: 'test@example.com',
  password: 'password'
};
```

## Mock Data Features

### Realistic API Delays
Mock functions simulate real API delays:
- SHORT (400ms): Quick operations like content details
- MEDIUM (600ms): Standard operations like fetching zones
- LONG (1000ms): Heavy operations like search and content lists

### Comprehensive Data
- **8 sample contents** across different zones
- **5 news zones** (Science & Tech, Health, Education, Environment, Astronomy)
- **2 sample users** with realistic profiles
- **Pagination support** for content lists
- **Search functionality** across titles, descriptions, authors, and tags

### Easy Customization
Add more mock data by extending arrays in `src/data/mockData.ts`:

```typescript
// Add more zones
export const mockZones: Zone[] = [
  // existing zones...
  {
    id: '6',
    name: 'New Zone',
    description: 'Description for new zone',
    order: 6,
  },
];
```

## Error Handling

All services implement consistent error handling:

```typescript
try {
  const result = await fetchContentDetail('123');
  // Handle success
} catch (error) {
  console.error('Error fetching content:', error);
  // Handle error gracefully
}
```

## Configuration

API configuration is managed in `src/constants/config.ts`:

```typescript
export const API_CONFIG = {
  baseUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
  timeout: 10000,
  retryAttempts: 3,
} as const;
```

## Environment Variables

Required environment variables:

```bash
EXPO_PUBLIC_API_URL=https://your-api-url.com
EXPO_PUBLIC_ENCRYPTION_KEY=your-encryption-key
```

## Best Practices

1. **Start with mock data** during development
2. **Use TypeScript types** for all API requests and responses
3. **Handle errors gracefully** with user-friendly messages
4. **Use React Query** for caching and state management
5. **Implement loading states** for better UX
6. **Test with mock data** before switching to API
7. **Keep mock data realistic** and up-to-date
8. **Document API changes** when switching from mock to real API

## Migration Checklist

When switching from mock to API:

- [ ] Set `DATA_CONFIG.USE_MOCK_DATA = false`
- [ ] Update `API_CONFIG.baseUrl` to your API endpoint
- [ ] Verify all API endpoints match expected structure
- [ ] Test authentication flow
- [ ] Verify error handling works with real API responses
- [ ] Update any hardcoded mock data references
- [ ] Test pagination and search functionality
- [ ] Verify image URLs and media content work

## Troubleshooting

### Common Issues

1. **Mock data not loading**: Check `DATA_CONFIG.USE_MOCK_DATA` is `true`
2. **API calls failing**: Verify `DATA_CONFIG.USE_MOCK_DATA` is `false` and API URL is correct
3. **Type errors**: Ensure mock data structure matches TypeScript interfaces
4. **Authentication issues**: Check mock credentials or API token handling

### Debugging

Enable detailed logging:

```typescript
// Services automatically log when using mock data
console.log('Using mock zones data'); // Appears when mock is active
```

For API debugging, add interceptors in `src/services/api.ts`:

```typescript
API.interceptors.request.use(request => {
  console.log('API Request:', request);
  return request;
});

API.interceptors.response.use(response => {
  console.log('API Response:', response);
  return response;
});
```

## Quick Start

1. **Development with Mock Data** (Current setup):
   - Mock data is enabled by default
   - Use test credentials: `test@example.com` / `password`
   - All services return realistic mock data with simulated delays

2. **Switch to Production API**:
   ```typescript
   // In src/constants/config.ts
   export const DATA_CONFIG = {
     USE_MOCK_DATA: false, // Change this to false
     // ...
   };
   
   export const API_CONFIG = {
     baseUrl: 'https://your-production-api.com', // Update this
     // ...
   };
   ```

3. **Test Both Modes**:
   - Keep mock data updated as API evolves
   - Test switching between modes regularly
   - Ensure error handling works in both scenarios