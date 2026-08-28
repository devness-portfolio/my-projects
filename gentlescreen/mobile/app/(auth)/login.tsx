import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';

import { CalmButton } from '@/components/CalmButton';
import { colors, spacing } from '@/theme';

export default function LoginPlaceholderScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>Parent sign in</Text>
        <Text style={styles.copy}>
          Secure parent authentication is the next implementation phase. This boundary is intentionally inactive in the foundation build.
        </Text>
        <CalmButton accessibilityLabel="Return to welcome" onPress={() => router.back()} variant="secondary">
          Back
        </CalmButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.canvas, flex: 1 },
  content: { flex: 1, gap: spacing.lg, justifyContent: 'center', padding: spacing.xl },
  title: { color: colors.ink, fontSize: 32, fontWeight: '800' },
  copy: { color: colors.mutedInk, fontSize: 17, lineHeight: 26 },
});

