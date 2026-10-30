import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CarrierList } from '../components/CarrierChip';
import { PackageIllustration } from '../components/PackageIllustration';
import { colors, radii, spacing } from '../theme';

type Props = {
  onTrack: (trackingNumber: string) => void;
};

export function HomeScreen({ onTrack }: Props) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [error, setError] = useState('');

  const handleTrack = () => {
    const value = trackingNumber.trim();
    if (value.length < 6) {
      setError('Enter a valid tracking number (at least 6 characters).');
      return;
    }
    setError('');
    onTrack(value);
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundAlt, '#DCE6F6']}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brandRow}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>T</Text>
            </View>
            <Text style={styles.brand}>
              Track<Text style={styles.brandAccent}>My</Text>Package
            </Text>
          </View>

          <View style={styles.hero}>
            <View style={styles.heroCopy}>
              <Text style={styles.headline}>
                Track Your Package{'\n'}
                <Text style={styles.headlineAccent}>Across the Globe</Text>
              </Text>
              <Text style={styles.subhead}>
                Enter your tracking number to follow every milestone from
                shipment to customs clearance.
              </Text>
            </View>
            <PackageIllustration />
          </View>

          <View style={styles.searchCard}>
            <Text style={styles.searchLabel}>Tracking number</Text>
            <View style={styles.searchRow}>
              <TextInput
                value={trackingNumber}
                onChangeText={(text) => {
                  setTrackingNumber(text);
                  if (error) setError('');
                }}
                placeholder="Enter your tracking number"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="characters"
                autoCorrect={false}
                returnKeyType="search"
                onSubmitEditing={handleTrack}
                style={styles.input}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Track Package"
                onPress={handleTrack}
                style={({ pressed }) => [
                  styles.trackButton,
                  pressed && styles.trackButtonPressed,
                ]}
              >
                <Text style={styles.trackButtonText}>Track Package</Text>
              </Pressable>
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>

          <CarrierList />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandMark: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMarkText: {
    color: colors.white,
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
  },
  brand: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: colors.text,
  },
  brandAccent: {
    color: colors.primary,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  heroCopy: {
    flex: 1,
  },
  headline: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  headlineAccent: {
    color: colors.primary,
  },
  subhead: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: colors.textSecondary,
  },
  searchCard: {
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#1B3CC4',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  searchLabel: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  searchRow: {
    gap: spacing.sm,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: colors.text,
  },
  trackButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  trackButtonPressed: {
    backgroundColor: colors.primaryDark,
  },
  trackButtonText: {
    color: colors.white,
    fontSize: 15,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  error: {
    marginTop: spacing.sm,
    color: colors.danger,
    fontSize: 13,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
});
