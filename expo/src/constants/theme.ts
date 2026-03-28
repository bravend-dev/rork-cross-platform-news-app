// Theme configuration
export const COLORS = {
  primary: '#ff6b35',
  secondary: '#333',
  background: '#000',
  surface: '#111',
  text: '#fff',
  textSecondary: '#ccc',
  textMuted: '#999',
  textDisabled: '#666',
  border: '#333',
  borderLight: 'rgba(255, 255, 255, 0.2)',
  error: '#ff4444',
  success: '#00C851',
  warning: '#ffbb33',
  info: '#33b5e5',
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',
  facebook: '#1877f2',
  tiktok: '#000',
  instagram: '#E4405F',
  youtube: '#FF0000',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const TYPOGRAPHY = {
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    title: 28,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
} as const;

export const BORDER_RADIUS = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50,
} as const;

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

export const LAYOUT = {
  headerHeight: 56,
  tabBarHeight: 60,
  maxContentWidth: 1200,
} as const;

// Theme object for easy access
export const theme = {
  colors: COLORS,
  spacing: SPACING,
  typography: TYPOGRAPHY,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  layout: LAYOUT,
} as const;

export type Theme = typeof theme;