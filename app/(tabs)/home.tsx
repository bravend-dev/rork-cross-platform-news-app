import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

interface Magazine {
  id: string;
  title: string;
  issue: string;
  date: string;
  cover: string;
  isLatest?: boolean;
}

const latestIssues: Magazine[] = [
  {
    id: '1',
    title: 'Khoa học và Đời sống',
    issue: 'số 33',
    date: '14/8/2025',
    cover: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop',
    isLatest: true,
  },
  {
    id: '2',
    title: 'Khoa học và Đời sống',
    issue: 'số 32',
    date: '7/8/2025',
    cover: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=400&fit=crop',
  },
  {
    id: '3',
    title: 'Khoa học và Đời sống',
    issue: 'số 31',
    date: '31/7/2025',
    cover: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=300&h=400&fit=crop',
  },
];

const topReads: Magazine[] = [
  {
    id: '4',
    title: 'Khoa học và Đời sống',
    issue: 'số 18',
    date: '1/5/2025',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
  },
  {
    id: '5',
    title: 'Khoa học và Đời sống',
    issue: 'số 16',
    date: '1/5/2025',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
  },
  {
    id: '6',
    title: 'Khoa học và Đời sống',
    issue: 'số 14',
    date: '3/4/2025',
    cover: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=300&h=400&fit=crop',
  },
];

const socialLinks = [
  { name: 'Trí thức & Cuộc sống', platform: 'facebook', color: '#1877f2' },
  { name: 'Trí thức & Cuộc sống', platform: 'tiktok', color: '#000' },
  { name: 'VIETNAM DAILY', platform: 'facebook', color: '#1877f2' },
  { name: 'VIETNAM DAILY', platform: 'tiktok', color: '#000' },
  { name: 'KHOA HỌC & ĐỜI SỐNG', platform: 'facebook', color: '#1877f2' },
];

export default function HomeScreen() {
  const renderMagazineCard = ({ item }: { item: Magazine }) => (
    <TouchableOpacity
      style={styles.magazineCard}
      onPress={() => router.push(`/detail/${item.id}`)}
    >
      <Image source={{ uri: item.cover }} style={styles.magazineCover} />
      <View style={styles.magazineInfo}>
        <Text style={styles.magazineTitle} numberOfLines={2}>
          {item.title} {item.issue}
        </Text>
        <Text style={styles.magazineDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSocialLink = (link: typeof socialLinks[0], index: number) => (
    <TouchableOpacity key={index} style={[styles.socialCard, { backgroundColor: link.color }]}>
      <Text style={styles.socialText}>{link.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=50&fit=crop' }}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>TRÍ THỨC & CUỘC SỐNG</Text>
          <Text style={styles.headerSubtitle}>
            baotrithuecuocsong@kienthuc.net.vn{'\n'}
            096 523 7766 - 091 181 1111{'\n'}
            (Tòa soạn Hà Nội)
          </Text>
        </View>

        {/* Current Issue Hero */}
        <TouchableOpacity
          style={styles.heroSection}
          onPress={() => router.push('/detail/1')}
        >
          <Image
            source={{ uri: latestIssues[0].cover }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>
              Khoa học và Đời sống năm thứ 66
            </Text>
            <Text style={styles.heroSubtitle}>2025 • Số 34/4390</Text>
          </View>
        </TouchableOpacity>

        {/* Latest Issues Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Serie số báo KH&ĐS mới nhất</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <ChevronRight color="#ff6b35" size={20} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={latestIssues}
            renderItem={renderMagazineCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Top Reads Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top đọc nhiều</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <ChevronRight color="#ff6b35" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.topReadsGrid}>
            {topReads.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={styles.topReadCard}
                onPress={() => router.push(`/detail/${item.id}`)}
              >
                <Text style={styles.topReadNumber}>{index + 1}</Text>
                <Image source={{ uri: item.cover }} style={styles.topReadCover} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Social Media Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hệ sinh thái Trí thức và Cuộc sống</Text>
          <Text style={styles.sectionSubtitle}>Báo chí • Nền tảng mạng xã hội</Text>
          <View style={styles.socialGrid}>
            {socialLinks.map(renderSocialLink)}
          </View>
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
  header: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 10,
  },
  headerTitle: {
    color: '#ff6b35',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  heroSection: {
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 200,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 16,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroSubtitle: {
    color: '#ccc',
    fontSize: 14,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    color: '#ccc',
    fontSize: 14,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllButton: {
    padding: 4,
  },
  horizontalList: {
    paddingLeft: 20,
  },
  magazineCard: {
    width: 120,
    marginRight: 16,
  },
  magazineCover: {
    width: 120,
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  magazineInfo: {
    flex: 1,
  },
  magazineTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  magazineDate: {
    color: '#999',
    fontSize: 11,
  },
  topReadsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  topReadCard: {
    alignItems: 'center',
    flex: 1,
    maxWidth: 100,
  },
  topReadNumber: {
    color: '#ff6b35',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  topReadCover: {
    width: 80,
    height: 100,
    borderRadius: 6,
  },
  socialGrid: {
    paddingHorizontal: 20,
    gap: 12,
  },
  socialCard: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  socialText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});