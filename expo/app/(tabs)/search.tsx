import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Search, Mic } from 'lucide-react-native';
import { router } from 'expo-router';

interface SearchResult {
  id: string;
  title: string;
  issue: string;
  date: string;
  cover: string;
}

const topSearches: SearchResult[] = [
  {
    id: '1',
    title: 'Khoa học và Đời sống số 18',
    issue: '1/5/2025',
    date: '',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=200&fit=crop',
  },
  {
    id: '2',
    title: 'Khoa học và Đời sống số 08',
    issue: '24/4/2025',
    date: '',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=200&fit=crop',
  },
  {
    id: '3',
    title: 'Khoa học và Đời sống số 16',
    issue: '1/5/2025',
    date: '',
    cover: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=150&h=200&fit=crop',
  },
  {
    id: '4',
    title: 'Khoa học và Đời sống Xuân Ất Tỵ 2025',
    issue: '',
    date: '',
    cover: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=150&h=200&fit=crop',
  },
  {
    id: '5',
    title: 'Khoa học và Đời sống số 14',
    issue: '3/4/2025',
    date: '',
    cover: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=150&h=200&fit=crop',
  },
  {
    id: '6',
    title: 'Khoa học và Đời sống số 13',
    issue: '',
    date: '',
    cover: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=150&h=200&fit=crop',
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>(topSearches);

  const handleSearch = (query: string) => {
    if (!query || query.length > 100) return;
    const sanitizedQuery = query.trim();
    
    setSearchQuery(sanitizedQuery);
    if (sanitizedQuery === '') {
      setResults(topSearches);
    } else {
      const filtered = topSearches.filter(item =>
        item.title.toLowerCase().includes(sanitizedQuery.toLowerCase())
      );
      setResults(filtered);
    }
  };

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => router.push(`/detail/${item.id}`)}
    >
      <Image source={{ uri: item.cover }} style={styles.resultCover} />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultDate}>- {item.issue}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchContainer}>
          <Search color="#999" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm số báo"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <TouchableOpacity style={styles.micButton}>
            <Mic color="#999" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Results */}
      <View style={styles.resultsContainer}>
        <Text style={styles.sectionTitle}>
          {searchQuery ? 'Kết quả tìm kiếm' : 'Top tìm kiếm'}
        </Text>
        <FlatList
          data={results}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.resultsList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchHeader: {
    padding: 20,
    paddingBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  micButton: {
    padding: 4,
    marginLeft: 8,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultsList: {
    paddingBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
  },
  resultCover: {
    width: 60,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  resultTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  resultDate: {
    color: '#999',
    fontSize: 14,
  },
});