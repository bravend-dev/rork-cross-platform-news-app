import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKey } from '../types';

/**
 * Secure storage wrapper for cross-platform compatibility
 * Uses SecureStore on native platforms and localStorage on web
 */
export const secureStorage = {
  async setItem(key: StorageKey, value: string): Promise<void> {
    if (!key?.trim() || !value?.trim()) {
      throw new Error('Key and value are required');
    }
    
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch (error) {
      console.error(`Error setting secure item ${key}:`, error);
      throw error;
    }
  },

  async getItem(key: StorageKey): Promise<string | null> {
    if (!key?.trim()) {
      throw new Error('Key is required');
    }
    
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(key);
      } else {
        return await SecureStore.getItemAsync(key);
      }
    } catch (error) {
      console.error(`Error getting secure item ${key}:`, error);
      return null;
    }
  },

  async deleteItem(key: StorageKey): Promise<void> {
    if (!key?.trim()) {
      throw new Error('Key is required');
    }
    
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error(`Error deleting secure item ${key}:`, error);
      throw error;
    }
  },
};

/**
 * Regular storage wrapper for cross-platform compatibility
 * Uses AsyncStorage on native platforms and localStorage on web
 */
export const storage = {
  async setItem(key: StorageKey, value: string): Promise<void> {
    if (!key?.trim() || !value?.trim()) {
      throw new Error('Key and value are required');
    }
    
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
      } else {
        await AsyncStorage.setItem(key, value);
      }
    } catch (error) {
      console.error(`Error setting storage item ${key}:`, error);
      throw error;
    }
  },

  async getItem(key: StorageKey): Promise<string | null> {
    if (!key?.trim()) {
      throw new Error('Key is required');
    }
    
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(key);
      } else {
        return await AsyncStorage.getItem(key);
      }
    } catch (error) {
      console.error(`Error getting storage item ${key}:`, error);
      return null;
    }
  },

  async multiRemove(keys: StorageKey[]): Promise<void> {
    if (!keys?.length) {
      throw new Error('Keys array is required');
    }
    
    try {
      if (Platform.OS === 'web') {
        keys.forEach(key => localStorage.removeItem(key));
      } else {
        await AsyncStorage.multiRemove(keys);
      }
    } catch (error) {
      console.error('Error removing multiple storage items:', error);
      throw error;
    }
  },

  async clear(): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        localStorage.clear();
      } else {
        await AsyncStorage.clear();
      }
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};

/**
 * JSON storage helpers
 */
export const jsonStorage = {
  async setItem<T>(key: StorageKey, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await storage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error setting JSON item ${key}:`, error);
      throw error;
    }
  },

  async getItem<T>(key: StorageKey): Promise<T | null> {
    try {
      const jsonValue = await storage.getItem(key);
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error getting JSON item ${key}:`, error);
      return null;
    }
  },
};