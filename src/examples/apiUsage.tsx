// Example usage of the integrated API functions
// This file demonstrates how to use the new API integration in your React Native app

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useZones, useContents, useSearchContents, useLoginMutation, useRegisterMutation } from '../hooks/useApi';
import { fetchZones } from '../services/zones';
import { fetchContents, searchContents } from '../services/contents';
import { login, register } from '../services/user';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

// Example 1: Using React Query hooks in a component
export function ExampleComponent() {
  // Fetch zones
  const { data: zones, isLoading: zonesLoading, error: zonesError } = useZones();

  // Fetch contents from first zone
  const firstZoneId = zones?.[0]?.id;
  const { data: contents, isLoading: contentsLoading } = useContents(firstZoneId || '', 1, 10);

  // Search contents
  const { data: searchResults } = useSearchContents('khoa học', 1, 10);

  // Login mutation
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const handleLogin = async () => {
    try {
      const user = await loginMutation.mutateAsync({
        email: 'user@example.com',
        password: 'password123',
      });
      console.log('Logged in user:', user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const user = await registerMutation.mutateAsync({
        email: 'newuser@example.com',
        password: 'password123',
        username: 'newuser',
        fullName: 'New User',
      });
      console.log('Registered user:', user);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  if (zonesLoading) return <Text>Loading zones...</Text>;
  if (zonesError) return <Text>Error loading zones</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zones</Text>
      {zones?.map(zone => (
        <Text key={zone.id}>{zone.name}</Text>
      ))}

      <Text style={styles.title}>Contents</Text>
      {contentsLoading ? (
        <Text>Loading contents...</Text>
      ) : (
        contents?.map(content => (
          <Text key={content.id}>{content.title}</Text>
        ))
      )}

      <Text style={styles.title}>Search Results</Text>
      {searchResults?.map(content => (
        <Text key={content.id}>{content.title}</Text>
      ))}

      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

// Example 2: Using API functions directly (without React Query)
export async function testApiDirectly() {
  try {
    // Test zones
    const zones = await fetchZones();
    console.log('Zones:', zones);

    if (zones.length > 0) {
      // Test contents
      const contents = await fetchContents(zones[0].id, 1, 10);
      console.log('Contents:', contents);

      // Test search
      const searchResults = await searchContents('khoa học', 1, 10, zones[0].id);
      console.log('Search results:', searchResults);
    }

    // Test authentication
    const user = await login('user@example.com', 'password123');
    if (user) {
      console.log('Logged in:', user);
    }

    // Test registration
    const newUser = await register('newuser@example.com', 'password123', 'newuser', 'New User');
    if (newUser) {
      console.log('Registered:', newUser);
    }
  } catch (error) {
    console.error('API test failed:', error);
  }
}

// Example 3: Using the API in your existing components
export function HomeScreenExample() {
  const { data: zones } = useZones();
  const firstZoneId = zones?.[0]?.id;
  
  // Get latest contents (most read)
  const { data: latestContents } = useContents(firstZoneId || '', 1, 5);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest News</Text>
      {latestContents?.map(content => (
        <View key={content.id} style={styles.contentItem}>
          <Text style={styles.contentTitle}>{content.title}</Text>
          <Text style={styles.contentDescription}>{content.description}</Text>
          <Text style={styles.contentDate}>{new Date(content.publishedAt).toLocaleDateString('vi-VN')}</Text>
        </View>
      ))}
    </View>
  );
}

// Example 4: Search functionality
export function SearchScreenExample() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults, isLoading } = useSearchContents(searchQuery, 1, 20);

  return (
    <View style={styles.container}>
      <Input
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Tìm kiếm bài viết..."
      />
      
      {isLoading && <Text>Đang tìm kiếm...</Text>}
      
      {searchResults?.map(content => (
        <View key={content.id} style={styles.contentItem}>
          <Text style={styles.contentTitle}>{content.title}</Text>
          <Text style={styles.contentDescription}>{content.description}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contentItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  contentDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  contentDate: {
    fontSize: 12,
    color: '#999',
  },
});