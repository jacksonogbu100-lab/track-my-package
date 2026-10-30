import { StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../theme';

type Props = {
  status: 'In Transit' | 'Held' | 'Delivered' | 'Completed' | 'In progress' | 'Pending';
};

const stylesByStatus: Record<
  Props['status'],
  { bg: string; text: string; bar: string }
> = {
  'In Transit': {
    bg: colors.successSoft,
    text: colors.success,
    bar: colors.success,
  },
  Delivered: {
    bg: colors.successSoft,
    text: colors.success,
    bar: colors.success,
  },
  Held: {
    bg: colors.dangerSoft,
    text: colors.danger,
    bar: colors.danger,
  },
  Completed: {
    bg: colors.successSoft,
    text: colors.success,
    bar: colors.success,
  },
  'In progress': {
    bg: colors.inProgressSoft,
    text: colors.inProgress,
    bar: colors.inProgress,
  },
  Pending: {
    bg: colors.pendingSoft,
    text: colors.pending,
    bar: colors.pending,
  },
};

export function StatusBadge({ status }: Props) {
  const palette = stylesByStatus[status];

  return (
    <View style={[styles.badge, { backgroundColor: palette.bg }]}>
      <View style={[styles.bar, { backgroundColor: palette.bar }]} />
      <Text style={[styles.label, { color: palette.text }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.full,
    alignSelf: 'flex-start',
  },
  bar: {
    width: 3,
    height: 12,
    borderRadius: 2,
  },
  label: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
});
