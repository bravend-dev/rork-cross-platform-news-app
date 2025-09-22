import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground,
  ScrollView
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';

const MAGAZINE_COVER_URL = 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=600&fit=crop';

type ServicePlan = 'basic' | 'standard' | 'premium';

interface PlanOption {
  id: ServicePlan;
  title: string;
  color: string;
  backgroundColor: string;
}

const PLAN_OPTIONS: PlanOption[] = [
  {
    id: 'basic',
    title: 'Cơ bản',
    color: '#FFFFFF',
    backgroundColor: '#F1C40F',
  },
  {
    id: 'standard',
    title: 'Tiêu chuẩn',
    color: '#FFFFFF',
    backgroundColor: '#3498DB',
  },
  {
    id: 'premium',
    title: 'Nâng cao',
    color: '#FFFFFF',
    backgroundColor: '#E74C3C',
  },
];

export default function ServiceSelectionScreen() {
  const { selectServicePlan } = useAuth();
  const insets = useSafeAreaInsets();

  const handleSelectPlan = async (plan: ServicePlan) => {
    try {
      await selectServicePlan(plan);
      router.replace('/profile-selection');
    } catch (error) {
      console.error('Error selecting service plan:', error);
    }
  };

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
            <Text style={styles.selectionTitle}>Chọn gói dịch vụ</Text>
            
            <View style={styles.plansContainer}>
              {PLAN_OPTIONS.map((plan) => (
                <TouchableOpacity
                  key={plan.id}
                  style={[styles.planButton, { backgroundColor: plan.backgroundColor }]}
                  onPress={() => handleSelectPlan(plan.id)}
                  testID={`plan-${plan.id}`}
                >
                  <View style={styles.planIcon}>
                    <Text style={[styles.planIconText, { color: plan.color }]}>
                      {plan.title.charAt(0)}
                    </Text>
                  </View>
                  <Text style={[styles.planTitle, { color: plan.color }]}>
                    {plan.title}
                  </Text>
                </TouchableOpacity>
              ))}
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
  plansContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  planButton: {
    width: 90,
    height: 120,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  planIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  planIconText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  planTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});