import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const MAGAZINE_COVER_URL = 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=600&fit=crop';

export default function LoadingScreen() {
  const { isLoading, isAuthenticated, hasCompletedOnboarding } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        if (isAuthenticated && hasCompletedOnboarding) {
          router.replace('/home');
        } else if (isAuthenticated && !hasCompletedOnboarding) {
          router.replace('/service-selection');
        } else {
          router.replace('/login');
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, hasCompletedOnboarding]);

  return (
    <ImageBackground 
      source={{ uri: MAGAZINE_COVER_URL }} 
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>TRÍ THỨC</Text>
            <Text style={styles.logoSubtext}>& Cuộc sống</Text>
          </View>
          
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6B35" />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B35',
    textAlign: 'center',
    letterSpacing: 2,
  },
  logoSubtext: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 1,
  },
  loadingContainer: {
    marginTop: 40,
  },
});