import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, spacing } from '@/theme';

type CalmButtonProps = PropsWithChildren<{
  accessibilityLabel: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}>;

export function CalmButton({
  accessibilityLabel,
  children,
  onPress,
  variant = 'primary',
}: CalmButtonProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' ? styles.primary : styles.secondary,
        pressed && styles.pressed,
      ]}
    >
      <Text style={variant === 'primary' ? styles.primaryText : styles.secondaryText}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: 14,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  primary: {
    backgroundColor: colors.sage,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.82,
  },
  primaryText: {
    color: colors.surface,
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryText: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '700',
  },
});

