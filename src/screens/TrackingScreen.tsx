import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBadge } from '../components/StatusBadge';
import { TrackingTimeline } from '../components/TrackingTimeline';
import type { ShipmentInfo } from '../data/tracking';
import { colors, radii, spacing } from '../theme';

type Props = {
  shipment: ShipmentInfo;
  onBack: () => void;
};

export function TrackingScreen({ shipment, onBack }: Props) {
  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundAlt, '#DCE6F6']}
      style={styles.gradient}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <Pressable
            onPress={onBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
          >
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
          <Text style={styles.topBrand}>TrackMyPackage</Text>
          <View style={styles.topSpacer} />
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.trackingMeta}>
              <Text style={styles.trackingLabel}>Tracking number</Text>
              <Text style={styles.trackingNumber}>
                {shipment.trackingNumber}
              </Text>
            </View>
            <StatusBadge status={shipment.overallStatus} />
          </View>

          <Text style={styles.updated}>
            Last updated: {shipment.lastUpdated}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Shipment progress</Text>
          <TrackingTimeline steps={shipment.steps} />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Shipment information</Text>
          <InfoRow label="Carrier" value={shipment.carrier} />
          <InfoRow label="Service" value={shipment.service} />
          <InfoRow label="Origin" value={shipment.origin} />
          <InfoRow label="Destination" value={shipment.destination} />
          <InfoRow label="Weight" value={shipment.weight} last />
        </View>

        <View style={styles.historyCard}>
          <Text style={styles.sectionTitle}>Tracking history</Text>
          {shipment.steps
            .filter((step) => step.timestamp)
            .slice()
            .reverse()
            .map((step) => (
              <View key={step.id} style={styles.historyRow}>
                <View style={styles.historyDot} />
                <View style={styles.historyCopy}>
                  <Text style={styles.historyTitle}>{step.title}</Text>
                  <Text style={styles.historyTime}>{step.timestamp}</Text>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

function InfoRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.infoRow, last && styles.infoRowLast]}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  backButton: {
    paddingVertical: 6,
    paddingRight: 8,
  },
  backButtonPressed: {
    opacity: 0.6,
  },
  backText: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: colors.primary,
  },
  topBrand: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: colors.text,
  },
  topSpacer: {
    width: 56,
  },
  statusCard: {
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#1B3CC4',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  trackingMeta: {
    flex: 1,
  },
  trackingLabel: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 4,
  },
  trackingNumber: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: colors.text,
  },
  updated: {
    marginTop: spacing.sm,
    fontSize: 13,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: colors.textSecondary,
  },
  infoValue: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: colors.text,
  },
  historyCard: {
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  historyRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  historyDot: {
    width: 10,
    height: 10,
    borderRadius: radii.full,
    backgroundColor: colors.primary,
    marginTop: 5,
  },
  historyCopy: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: colors.text,
    marginBottom: 2,
  },
  historyTime: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: colors.textMuted,
  },
});
