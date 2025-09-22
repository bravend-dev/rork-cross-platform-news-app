import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground,
  Image,
  Modal,
  ScrollView
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { Edit3, X } from 'lucide-react-native';

const MAGAZINE_COVER_URL = 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=600&fit=crop';

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
];

export default function CreateProfileScreen() {
  const [profileName, setProfileName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_AVATARS[0]);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { createProfile, selectProfile, completeOnboarding } = useAuth();
  const insets = useSafeAreaInsets();

  const handleSaveProfile = async () => {
    if (!profileName.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      const newProfile = await createProfile(profileName.trim(), selectedAvatar);
      await selectProfile(newProfile);
      await completeOnboarding();
      router.replace('/home');
    } catch (error) {
      console.error('Error creating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <ImageBackground 
      source={{ uri: MAGAZINE_COVER_URL }} 
      style={styles.container}
      resizeMode="cover"
    >
      <View style={[styles.overlay, { paddingTop: insets.top }]}>
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={handleClose}
            testID="close-button"
          >
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Thêm tài khoản</Text>
            
            <TouchableOpacity
              style={styles.avatarButton}
              onPress={() => setShowAvatarModal(true)}
              testID="avatar-button"
            >
              <Image source={{ uri: selectedAvatar }} style={styles.avatarImage} />
              <View style={styles.editIconContainer}>
                <Edit3 size={16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
            
            <TextInput
              style={styles.nameInput}
              placeholder="Tên người dùng"
              placeholderTextColor="#999"
              value={profileName}
              onChangeText={setProfileName}
              maxLength={20}
              testID="profile-name-input"
            />
            
            <TouchableOpacity 
              style={[
                styles.saveButton, 
                (!profileName.trim() || isLoading) && styles.saveButtonDisabled
              ]}
              onPress={handleSaveProfile}
              disabled={!profileName.trim() || isLoading}
              testID="save-profile-button"
            >
              <Text style={styles.saveButtonText}>
                {isLoading ? 'Đang lưu...' : 'Lưu tài khoản'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          visible={showAvatarModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowAvatarModal(false)}
        >
          <View style={styles.avatarModalOverlay}>
            <View style={styles.avatarModalContent}>
              <Text style={styles.avatarModalTitle}>Chọn ảnh đại diện</Text>
              
              <ScrollView contentContainerStyle={styles.avatarGrid}>
                {DEFAULT_AVATARS.map((avatar, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.avatarOption,
                      selectedAvatar === avatar && styles.avatarOptionSelected
                    ]}
                    onPress={() => {
                      setSelectedAvatar(avatar);
                      setShowAvatarModal(false);
                    }}
                    testID={`avatar-option-${index}`}
                  >
                    <Image source={{ uri: avatar }} style={styles.avatarOptionImage} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              <TouchableOpacity
                style={styles.avatarModalCloseButton}
                onPress={() => setShowAvatarModal(false)}
                testID="avatar-modal-close"
              >
                <Text style={styles.avatarModalCloseText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 32,
    textAlign: 'center',
  },
  avatarButton: {
    position: 'relative',
    marginBottom: 24,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  nameInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#FFFFFF',
    width: '100%',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  avatarModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  avatarModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    maxHeight: '80%',
  },
  avatarModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  avatarOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarOptionSelected: {
    borderColor: '#FF6B35',
  },
  avatarOptionImage: {
    width: '100%',
    height: '100%',
  },
  avatarModalCloseButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  avatarModalCloseText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});