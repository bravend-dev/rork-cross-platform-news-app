// Legacy colors file - use @/constants/theme instead
import { theme } from '@/constants/theme';

const tintColorLight = theme.colors.primary;

export default {
  light: {
    text: theme.colors.text,
    background: theme.colors.background,
    tint: tintColorLight,
    tabIconDefault: theme.colors.textDisabled,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: theme.colors.text,
    background: theme.colors.background,
    tint: tintColorLight,
    tabIconDefault: theme.colors.textDisabled,
    tabIconSelected: tintColorLight,
  },
};