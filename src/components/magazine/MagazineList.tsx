import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ListRenderItem,
} from 'react-native';
import { Magazine } from '@/types';
import { theme } from '@/constants/theme';
import { MagazineCard } from './MagazineCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface MagazineListProps {
  magazines: Magazine[];
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  variant?: 'default' | 'compact' | 'featured';
  horizontal?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  onMagazinePress?: (magazine: Magazine) => void;
  emptyMessage?: string;
  testID?: string;
}

export const MagazineList: React.FC<MagazineListProps> = ({
  magazines,
  loading = false,
  refreshing = false,
  onRefresh,
  onLoadMore,
  hasMore = false,
  variant = 'default',
  horizontal = false,
  showsHorizontalScrollIndicator = false,
  onMagazinePress,
  emptyMessage = 'Không có tạp chí nào',
  testID,
}) => {
  const renderMagazine: ListRenderItem<Magazine> = ({ item }) => (
    <MagazineCard
      magazine={item}
      variant={variant}
      onPress={onMagazinePress}
      style={horizontal ? styles.horizontalItem : undefined}
    />
  );

  const renderFooter = () => {
    if (!hasMore || !onLoadMore) return null;
    return (
      <View style={styles.footer}>
        <LoadingSpinner size="small" text="Đang tải thêm..." />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) {
      return <LoadingSpinner text="Đang tải..." />;
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  };

  const handleEndReached = () => {
    if (hasMore && onLoadMore && !loading) {
      onLoadMore();
    }
  };

  return (
    <FlatList
      data={magazines}
      renderItem={renderMagazine}
      keyExtractor={(item) => item.id}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={!horizontal}
      contentContainerStyle={[
        horizontal ? styles.horizontalContent : styles.verticalContent,
        magazines.length === 0 && styles.emptyContent,
      ]}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        ) : undefined
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      testID={testID}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={5}
    />
  );
};

const styles = StyleSheet.create({
  verticalContent: {
    padding: theme.spacing.md,
  },
  horizontalContent: {
    paddingHorizontal: theme.spacing.md,
  },
  horizontalItem: {
    marginRight: theme.spacing.md,
    width: 150,
  },
  emptyContent: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyText: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  footer: {
    paddingVertical: theme.spacing.lg,
  },
});