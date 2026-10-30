import { StyleSheet, Text, View } from 'react-native';
import type { TrackingStep } from '../data/tracking';
import { colors, radii, spacing } from '../theme';
import { StatusBadge } from './StatusBadge';

type Props = {
  steps: TrackingStep[];
};

function nodeColors(status: TrackingStep['status']) {
  switch (status) {
    case 'completed':
      return {
        fill: colors.successSoft,
        ring: colors.successLine,
        line: colors.successLine,
      };
    case 'in_progress':
      return {
        fill: colors.inProgressSoft,
        ring: colors.inProgress,
        line: colors.pendingLine,
      };
    default:
      return {
        fill: colors.pendingSoft,
        ring: colors.pendingLine,
        line: colors.pendingLine,
      };
  }
}

function statusLabel(status: TrackingStep['status']) {
  if (status === 'completed') return 'Completed';
  if (status === 'in_progress') return 'In progress';
  return 'Pending';
}

export function TrackingTimeline({ steps }: Props) {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const palette = nodeColors(step.status);
        const isLast = index === steps.length - 1;
        const next = steps[index + 1];
        const connectorColor =
          step.status === 'completed' && next?.status !== 'pending'
            ? colors.successLine
            : step.status === 'completed'
              ? colors.successLine
              : step.status === 'in_progress'
                ? colors.inProgress
                : colors.pendingLine;

        return (
          <View key={step.id} style={styles.row}>
            <View style={styles.rail}>
              <View
                style={[
                  styles.node,
                  {
                    backgroundColor: palette.fill,
                    borderColor: palette.ring,
                  },
                ]}
              >
                {step.status === 'completed' ? (
                  <Text style={styles.check}>✓</Text>
                ) : step.status === 'in_progress' ? (
                  <View style={styles.dot} />
                ) : null}
              </View>
              {!isLast && (
                <View
                  style={[
                    styles.connector,
                    {
                      backgroundColor:
                        step.status === 'in_progress'
                          ? undefined
                          : connectorColor,
                    },
                    step.status === 'in_progress' && styles.connectorPartial,
                  ]}
                />
              )}
            </View>

            <View style={[styles.content, isLast && styles.contentLast]}>
              <Text
                style={[
                  styles.title,
                  step.status === 'pending' && styles.titlePending,
                ]}
              >
                {step.title}
              </Text>
              <View style={styles.meta}>
                <StatusBadge status={statusLabel(step.status)} />
                <Text style={styles.timestamp}>
                  {step.timestamp ?? '—'}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    minHeight: 88,
  },
  rail: {
    width: 36,
    alignItems: 'center',
  },
  node: {
    width: 28,
    height: 28,
    borderRadius: radii.full,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  check: {
    color: colors.success,
    fontSize: 13,
    fontFamily: 'PlusJakartaSans_700Bold',
    lineHeight: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radii.full,
    backgroundColor: colors.inProgress,
  },
  connector: {
    width: 3,
    flex: 1,
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 2,
  },
  connectorPartial: {
    backgroundColor: colors.inProgress,
    opacity: 0.35,
  },
  content: {
    flex: 1,
    paddingLeft: spacing.md,
    paddingBottom: spacing.lg,
  },
  contentLast: {
    paddingBottom: 0,
  },
  title: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: colors.text,
    marginBottom: 8,
  },
  titlePending: {
    color: colors.textSecondary,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  timestamp: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: colors.textMuted,
  },
});
