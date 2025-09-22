import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Check, X } from 'lucide-react-native';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  color: string;
  features: string[];
  popular?: boolean;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Cơ bản',
    price: '99.000đ/tháng',
    color: '#ffd700',
    features: [
      'Đọc 10 bài viết/tháng',
      'Truy cập số báo cũ (3 tháng)',
      'Hỗ trợ qua email',
    ],
  },
  {
    id: 'standard',
    name: 'Tiêu chuẩn',
    price: '199.000đ/tháng',
    color: '#4a90e2',
    popular: true,
    features: [
      'Đọc không giới hạn',
      'Truy cập số báo cũ (1 năm)',
      'Tải PDF offline',
      'Hỗ trợ ưu tiên',
      'Không quảng cáo',
    ],
  },
  {
    id: 'premium',
    name: 'Nâng cao',
    price: '299.000đ/tháng',
    color: '#e74c3c',
    features: [
      'Tất cả tính năng Tiêu chuẩn',
      'Truy cập toàn bộ kho báo',
      'Nội dung độc quyền',
      'Webinar và sự kiện',
      'Hỗ trợ 24/7',
      'Chia sẻ gia đình (5 tài khoản)',
    ],
  },
];

export default function SubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState<string>('standard');

  const renderPlan = (plan: SubscriptionPlan) => (
    <TouchableOpacity
      key={plan.id}
      style={[
        styles.planCard,
        selectedPlan === plan.id && styles.selectedPlan,
        plan.popular && styles.popularPlan,
      ]}
      onPress={() => setSelectedPlan(plan.id)}
    >
      {plan.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Phổ biến nhất</Text>
        </View>
      )}

      <View style={[styles.planHeader, { backgroundColor: plan.color }]}>
        <Text style={styles.planName}>{plan.name}</Text>
        <Text style={styles.planPrice}>{plan.price}</Text>
      </View>

      <View style={styles.planFeatures}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Check color="#4CAF50" size={16} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {selectedPlan === plan.id && (
        <View style={styles.selectedIndicator}>
          <Check color="#fff" size={20} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <X color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chọn gói dịch vụ</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Text style={styles.subtitle}>
          Truy cập không giới hạn vào kho tàng tri thức
        </Text>

        <View style={styles.plansContainer}>
          {subscriptionPlans.map(renderPlan)}
        </View>

        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>Lợi ích khi đăng ký:</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Check color="#4CAF50" size={16} />
              <Text style={styles.benefitText}>
                Truy cập toàn bộ nội dung chất lượng cao
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Check color="#4CAF50" size={16} />
              <Text style={styles.benefitText}>
                Cập nhật tin tức khoa học mới nhất
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Check color="#4CAF50" size={16} />
              <Text style={styles.benefitText}>
                Hỗ trợ phát triển báo chí Việt Nam
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeButtonText}>
            Đăng ký gói {subscriptionPlans.find(p => p.id === selectedPlan)?.name}
          </Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          Bằng việc đăng ký, bạn đồng ý với Điều khoản sử dụng và Chính sách bảo mật
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  plansContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  planCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPlan: {
    borderColor: '#ff6b35',
  },
  popularPlan: {
    borderColor: '#4a90e2',
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#4a90e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  popularText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  planHeader: {
    padding: 20,
    alignItems: 'center',
  },
  planName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  planPrice: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
  },
  planFeatures: {
    padding: 20,
    paddingTop: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ff6b35',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitsSection: {
    padding: 20,
    paddingTop: 32,
  },
  benefitsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitText: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  subscribeButton: {
    backgroundColor: '#ff6b35',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsText: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});