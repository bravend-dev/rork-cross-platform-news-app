# API Integration Documentation

This document explains how to use the integrated API functions in your React Native app.

## Overview

The API integration includes the following services:
- **Zones**: Fetch content zones/categories
- **Contents**: Fetch articles/content by zone, search, and get most read
- **User Authentication**: Login, register, profile management

## Services

### 1. Zones Service (`src/services/zones.ts`)

```typescript
import { fetchZones } from '../services/zones';

// Fetch all zones
const zones = await fetchZones();
```

### 2. Contents Service (`src/services/contents.ts`)

```typescript
import { 
  fetchContents, 
  fetchMostReadContents, 
  searchContents, 
  fetchContentDetail 
} from '../services/contents';

// Fetch contents by zone
const contents = await fetchContents(zoneId, pageIndex, pageSize);

// Fetch most read contents
const mostRead = await fetchMostReadContents(zoneId, pageSize);

// Search contents
const searchResults = await searchContents(query, pageIndex, pageSize, defaultZoneId);

// Fetch content detail
const content = await fetchContentDetail(contentId);
```

### 3. User Service (`src/services/user.ts`)

```typescript
import { 
  register, 
  login, 
  getInfo, 
  updateProfile, 
  resetPassword, 
  signOut 
} from '../services/user';

// Register new user
const user = await register(email, password, username, fullName, fingerprint);

// Login user
const user = await login(email, password, fingerprint);

// Get user info
const user = await getInfo(token);

// Update profile
const user = await updateProfile(token, profileData);

// Reset password
await resetPassword(email);

// Sign out
await signOut(token);
```

## React Query Hooks

For better state management and caching, use the provided React Query hooks:

### 1. Data Fetching Hooks

```typescript
import { 
  useZones, 
  useContents, 
  useSearchContents, 
  useContentDetail,
  useUserInfo 
} from '../hooks/useApi';

// In your component
function MyComponent() {
  const { data: zones, isLoading, error } = useZones();
  const { data: contents } = useContents(zoneId, pageIndex, pageSize);
  const { data: searchResults } = useSearchContents(query, pageIndex, pageSize);
  const { data: content } = useContentDetail(contentId);
  const { data: user } = useUserInfo(token);
  
  // ... rest of component
}
```

### 2. Mutation Hooks

```typescript
import { 
  useLoginMutation, 
  useRegisterMutation, 
  useUpdateProfileMutation,
  useResetPasswordMutation,
  useSignOutMutation 
} from '../hooks/useApi';

function AuthComponent() {
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  
  const handleLogin = async () => {
    try {
      const user = await loginMutation.mutateAsync({
        email: 'user@example.com',
        password: 'password123',
      });
      console.log('Logged in:', user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  // ... rest of component
}
```

## Configuration

### API Base URL

Update the API base URL in `src/constants/config.ts`:

```typescript
export const API_CONFIG = {
  baseUrl: process.env.EXPO_PUBLIC_API_URL || 'https://your-api-domain.com',
  timeout: 10000,
  retryAttempts: 3,
} as const;
```

### Environment Variables

Add to your `.env` file:

```
EXPO_PUBLIC_API_URL=https://your-api-domain.com
```

## Usage Examples

### 1. Home Screen with Latest Content

```typescript
import { useZones, useContents } from '../hooks/useApi';

export function HomeScreen() {
  const { data: zones } = useZones();
  const firstZoneId = zones?.[0]?.id;
  const { data: contents, isLoading } = useContents(firstZoneId || '', 1, 10);

  if (isLoading) return <LoadingSpinner />;

  return (
    <View>
      {contents?.map(content => (
        <ContentCard key={content.id} content={content} />
      ))}
    </View>
  );
}
```

### 2. Search Screen

```typescript
import { useState } from 'react';
import { useSearchContents } from '../hooks/useApi';

export function SearchScreen() {
  const [query, setQuery] = useState('');
  const { data: results, isLoading } = useSearchContents(query, 1, 20);

  return (
    <View>
      <Input 
        value={query}
        onChangeText={setQuery}
        placeholder="Tìm kiếm..."
      />
      {isLoading && <LoadingSpinner />}
      {results?.map(content => (
        <ContentCard key={content.id} content={content} />
      ))}
    </View>
  );
}
```

### 3. Authentication

```typescript
import { useLoginMutation } from '../hooks/useApi';

export function LoginScreen() {
  const loginMutation = useLoginMutation();

  const handleLogin = async (email: string, password: string) => {
    try {
      const user = await loginMutation.mutateAsync({ email, password });
      // Handle successful login
      navigation.navigate('Home');
    } catch (error) {
      // Handle login error
      Alert.alert('Lỗi', 'Đăng nhập thất bại');
    }
  };

  return (
    <View>
      {/* Login form */}
      <Button 
        title="Đăng nhập" 
        onPress={() => handleLogin(email, password)}
        loading={loginMutation.isPending}
      />
    </View>
  );
}
```

## Error Handling

All API functions include proper error handling. Use try-catch blocks or React Query's error states:

```typescript
// With direct API calls
try {
  const contents = await fetchContents(zoneId, 1, 10);
} catch (error) {
  console.error('Failed to fetch contents:', error);
}

// With React Query hooks
const { data, error, isLoading } = useContents(zoneId, 1, 10);

if (error) {
  return <Text>Error: {error.message}</Text>;
}
```

## Type Safety

All API functions are fully typed with TypeScript. The main types are:

- `Zone`: Content zones/categories
- `Content`: Articles/content items
- `User`: User information
- `RegisterForm`: Registration form data
- `UpdateProfileForm`: Profile update data

## Caching and Performance

React Query hooks automatically handle:
- Data caching
- Background refetching
- Stale data management
- Loading states
- Error states

Cache times are configured per hook:
- Zones: 5 minutes
- Contents: 2 minutes
- Search results: 1 minute
- Content details: 10 minutes
- User info: 5 minutes

## Migration from Mock Data

The existing `MagazineService` has been updated to use the real API while maintaining backward compatibility. Your existing components should continue to work without changes.

## Testing

Use the example functions in `src/examples/apiUsage.tsx` to test the API integration:

```typescript
import { testApiDirectly } from '../examples/apiUsage';

// Test all API functions
await testApiDirectly();
```