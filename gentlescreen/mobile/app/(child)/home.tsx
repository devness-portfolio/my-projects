import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';

import { CalmButton } from '@/components/CalmButton';
import { colors, spacing } from '@/theme';

const categories = ['Stories', 'Animals', 'Numbers and Letters', 'Nature'];

export default function ChildHomePlaceholderScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>What would you like to watch?</Text>
        <Text style={styles.copy}>A calm, finite catalog will appear here after a parent chooses a profile.</Text>
        <View accessibilityLabel="Preview categories" style={styles.grid}>
          {categories.map((category) => (
            <View key={category} style={styles.card}>
              <Text style={styles.cardText}>{category}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.guardrail}>No endless feed. No autoplay. Parent-approved videos only.</Text>
        <CalmButton accessibilityLabel="Return to parent area" onPress={() => router.back()} variant="secondary">
          Parent area
        </CalmButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.canvas, flex: 1 },
  content: { flex: 1, gap: spacing.lg, padding: spacing.xl },
  title: { color: colors.ink, fontSize: 30, fontWeight: '800', lineHeight: 38, marginTop: spacing.lg },
  copy: { color: colors.mutedInk, fontSize: 17, lineHeight: 25 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'flex-end',
    minHeight: 112,
    padding: spacing.md,
    width: '47%',
  },
  cardText: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  guardrail: { color: colors.mutedInk, fontSize: 14, lineHeight: 21 },
});

