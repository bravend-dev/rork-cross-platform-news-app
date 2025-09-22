import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { X } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CategoryItem {
  id: string;
  title: string;
  route?: string;
}

const categoryItems: CategoryItem[] = [
  {
    id: '1',
    title: 'Series Khoa học và Đời sống',
    route: '/home',
  },
  {
    id: '2',
    title: 'Hệ sinh thái Tri thức và Cuộc sống',
    route: '/search',
  },
  {
    id: '3',
    title: 'Dịch vụ và tài khoản',
    route: '/account',
  },
];

export default function CategoriesScreen() {
  const insets = useSafeAreaInsets();

  const handleCategoryPress = (item: CategoryItem) => {
    if (item.route) {
      router.push(item.route as any);
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Danh mục</Text>
        
        <View style={styles.menuContainer}>
          {categoryItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleCategoryPress(item)}
              testID={`category-${item.id}`}
            >
              <Text style={styles.menuItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleClose}
          testID="close-button"
        >
          <X size={24} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 60,
  },
  menuContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  menuItem: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  menuItemText: {
    fontSize: 18,
    color: '#BFBFBF',
    textAlign: 'center',
    fontWeight: '400',
  },
  closeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
  },
});