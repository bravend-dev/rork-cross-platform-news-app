import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground,
  ScrollView,
  Image
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { Plus } from 'lucide-react-native';

const MAGAZINE_COVER_URL = 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=600&fit=crop';

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
];

export default function ProfileSelectionScreen() {
  const { profiles, selectProfile, completeOnboarding } = useAuth();
  const insets = useSafeAreaInsets();

  const handleSelectProfile = async (profile: any) => {
    try {
      await selectProfile(profile);
      await completeOnboarding();
      router.replace('/home');
    } catch (error) {
      console.error('Error selecting profile:', error);
    }
  };

  const handleAddProfile = () => {
    router.push('/create-profile');
  };

  React.useEffect(() => {
    if (profiles.length === 0) {
      router.replace('/create-profile');
    }
  }, [profiles.length]);

  return (
    <ImageBackground 
      source={{ uri: MAGAZINE_COVER_URL }} 
      style={styles.container}
      resizeMode="cover"
    >
      <View style={[styles.overlay, { paddingTop: insets.top }]}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.logoText}>TRÍ THỨC</Text>
            <Text style={styles.logoSubtext}>& Cuộc sống</Text>
            <Text style={styles.contactInfo}>baotrithuecuocsong@kienthuc.net.vn</Text>
            <Text style={styles.contactInfo}>096 523 7756 - 091 181 1111</Text>
            <Text style={styles.contactInfo}>(Tòa soạn Hà Nội)</Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.issueTitle}>Khoa học và Đời sống năm thứ 66</Text>
            <Text style={styles.issueSubtitle}>2025 • Số 34/4390</Text>
          </View>

          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>Chọn tài khoản</Text>
            
            <View style={styles.profilesGrid}>
              {profiles.map((profile) => (
                <TouchableOpacity
                  key={profile.id}
                  style={styles.profileButton}
                  onPress={() => handleSelectProfile(profile)}
                  testID={`profile-${profile.id}`}
                >
                  <View style={styles.avatarContainer}>
                    <Image
                      source={{ 
                        uri: profile.avatar || DEFAULT_AVATARS[parseInt(profile.id) % DEFAULT_AVATARS.length] 
                      }}
                      style={styles.avatar}
                    />
                  </View>
                  <Text style={styles.profileName}>{profile.name}</Text>
                </TouchableOpacity>
              ))}
              
              <TouchableOpacity
                style={styles.addProfileButton}
                onPress={handleAddProfile}
                testID="add-profile-button"
              >
                <View style={styles.addAvatarContainer}>
                  <Plus size={32} color="#FFFFFF" />
                </View>
                <Text style={styles.addProfileText}>Thêm tài khoản</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B35',
    textAlign: 'center',
    letterSpacing: 2,
  },
  logoSubtext: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 4,
    letterSpacing: 1,
  },
  contactInfo: {
    fontSize: 12,
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 2,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  issueTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  issueSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  selectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
  },
  profilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  profileButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  addProfileButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  addAvatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderStyle: 'dashed',
  },
  addProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});