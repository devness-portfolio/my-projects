import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';

import { CalmButton } from '@/components/CalmButton';
import { colors, spacing } from '@/theme';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.mark} accessibilityElementsHidden>
          <Text style={styles.markText}>G</Text>
        </View>
        <View style={styles.copy}>
          <Text accessibilityRole="header" style={styles.title}>
            GentleScreen
          </Text>
          <Text style={styles.subtitle}>
            Parent-reviewed videos for intentional screen time.
          </Text>
          <Text style={styles.detail}>
            Curated choices, understandable ratings, and viewing limits you control.
          </Text>
        </View>
        <View style={styles.actions}>
          <CalmButton
            accessibilityLabel="Continue to parent sign in"
            onPress={() => router.push('/(auth)/login')}
          >
            Parent sign in
          </CalmButton>
          <CalmButton
            accessibilityLabel="Preview child home"
            onPress={() => router.push('/(child)/home')}
            variant="secondary"
          >
            Preview child home
          </CalmButton>
        </View>
        <Text style={styles.note}>
          Children use profiles managed by a parent and do not create accounts.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.canvas, flex: 1 },
  content: { flex: 1, justifyContent: 'center', padding: spacing.xl },
  mark: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.sageSoft,
    borderRadius: 24,
    height: 64,
    justifyContent: 'center',
    marginBottom: spacing.xl,
    width: 64,
  },
  markText: { color: colors.sage, fontSize: 30, fontWeight: '800' },
  copy: { gap: spacing.md },
  title: { color: colors.ink, fontSize: 38, fontWeight: '800', letterSpacing: -1 },
  subtitle: { color: colors.ink, fontSize: 23, fontWeight: '600', lineHeight: 31 },
  detail: { color: colors.mutedInk, fontSize: 17, lineHeight: 26 },
  actions: { gap: spacing.md, marginTop: spacing.xxl },
  note: { color: colors.mutedInk, fontSize: 14, lineHeight: 21, marginTop: spacing.lg },
});

