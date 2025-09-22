import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { router } from 'expo-router';
import { Magazine } from '../../types';
import { theme } from '../../constants/theme';
import { formatDate } from '../../utils/helpers';

interface MagazineCardProps {
  magazine: Magazine;
  style?: ViewStyle;
  onPress?: (magazine: Magazine) => void;
  variant?: 'default' | 'compact' | 'featured';
}

export const MagazineCard: React.FC<MagazineCardProps> = ({
  magazine,
  style,
  onPress,
  variant = 'default',
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress(magazine);
    } else {
      router.push(`/detail/${magazine.id}`);
    }
  };

  const containerStyle = [
    styles.container,
    styles[variant],
    style,
  ];

  const imageStyle = [
    styles.image,
    styles[`${variant}Image` as keyof typeof styles],
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={handlePress}
      testID={`magazine-card-${magazine.id}`}
      activeOpacity={0.7}
    >
      <Image source={{ uri: magazine.cover }} style={imageStyle} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={variant === 'compact' ? 1 : 2}>
          {magazine.title} {magazine.issue}
        </Text>
        <Text style={styles.date}>{formatDate(magazine.date)}</Text>
        {magazine.description && variant !== 'compact' && (
          <Text style={styles.description} numberOfLines={2}>
            {magazine.description}
          </Text>
        )}
        {magazine.isLatest && (
          <View style={styles.latestBadge}>
            <Text style={styles.latestText}>Mới nhất</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  default: {
    marginBottom: theme.spacing.md,
  },
  compact: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  featured: {
    marginBottom: theme.spacing.lg,
  },
  image: {
    backgroundColor: theme.colors.border,
  },
  defaultImage: {
    width: '100%',
    height: 200,
  },
  compactImage: {
    width: 80,
    height: 100,
  },
  featuredImage: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: theme.spacing.md,
    flex: 1,
  },
  title: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  date: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeights.normal * theme.typography.sizes.sm,
    marginTop: theme.spacing.xs,
  },
  latestBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  latestText: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
});