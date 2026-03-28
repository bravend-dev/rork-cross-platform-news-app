import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Plus, Edit3, Lock, HelpCircle, LogOut } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
];

export default function AccountScreen() {
  const { profiles, currentProfile, logout, selectProfile } = useAuth();
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSelectProfile = async (profile: any) => {
    try {
      await selectProfile(profile);
    } catch (error) {
      console.error('Error selecting profile:', error);
    }
  };

  const renderProfile = (profile: any) => (
    <TouchableOpacity 
      key={profile.id} 
      style={[
        styles.profileCard,
        currentProfile?.id === profile.id && styles.activeProfileCard
      ]}
      onPress={() => handleSelectProfile(profile)}
    >
      <Image 
        source={{ 
          uri: profile.avatar || DEFAULT_AVATARS[parseInt(profile.id) % DEFAULT_AVATARS.length] 
        }} 
        style={styles.profileAvatar} 
      />
      <Text style={styles.profileName}>{profile.name}</Text>
      {currentProfile?.id === profile.id && (
        <View style={styles.activeIndicator} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Profiles Section */}
        <View style={styles.profilesSection}>
          <View style={styles.profilesGrid}>
            {profiles.map(renderProfile)}
            <TouchableOpacity
              style={styles.addProfileCard}
              onPress={() => router.push('/create-profile')}
            >
              <View style={styles.addProfileButton}>
                <Plus color="#fff" size={24} />
              </View>
              <Text style={styles.addProfileText}>Thêm tài khoản</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.editProfilesButton}>
            <Edit3 color="#999" size={16} />
            <Text style={styles.editProfilesText}>Chỉnh sửa người dùng</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Options */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Lock color="#fff" size={20} />
            <Text style={styles.menuText}>Đổi mật khẩu</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <HelpCircle color="#fff" size={20} />
            <Text style={styles.menuText}>Trợ giúp</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/subscription')}
          >
            <Text style={styles.subscriptionIcon}>💎</Text>
            <Text style={styles.menuText}>Gói dịch vụ</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
          >
            <LogOut color="#ff4444" size={20} />
            <Text style={[styles.menuText, styles.logoutText]}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>Trí thức & Cuộc sống</Text>
          <Text style={styles.appVersion}>Phiên bản 2.1.0</Text>
          <Text style={styles.copyright}>
            © 2025 Báo Trí thức & Cuộc sống
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  profilesSection: {
    padding: 20,
    paddingBottom: 30,
  },
  profilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileCard: {
    alignItems: 'center',
    width: '22%',
    marginBottom: 16,
    position: 'relative',
  },
  activeProfileCard: {
    opacity: 1,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff6b35',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  profileName: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  addProfileCard: {
    alignItems: 'center',
    width: '22%',
    marginBottom: 16,
  },
  addProfileButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  addProfileText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  editProfilesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  editProfilesText: {
    color: '#999',
    fontSize: 14,
    marginLeft: 8,
  },
  menuSection: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 16,
  },
  subscriptionIcon: {
    fontSize: 20,
    width: 20,
    textAlign: 'center',
  },
  logoutItem: {
    borderBottomWidth: 0,
    marginTop: 20,
  },
  logoutText: {
    color: '#ff4444',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  appName: {
    color: '#ff6b35',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  appVersion: {
    color: '#999',
    fontSize: 14,
    marginBottom: 4,
  },
  copyright: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
});