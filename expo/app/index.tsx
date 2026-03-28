import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function AppIndex() {
  const { isLoading, isAuthenticated, hasCompletedOnboarding } = useAuth();

  if (isLoading) {
    return <Redirect href="/loading" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/service-selection" />;
  }

  return <Redirect href="/home" />;
}