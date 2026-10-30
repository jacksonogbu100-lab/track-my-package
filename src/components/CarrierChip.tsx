import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing } from '../theme';

const CARRIERS = [
  { name: 'USPS', accent: '#333366' },
  { name: 'DHL', accent: '#FFCC00' },
  { name: 'UPS', accent: '#351C15' },
  { name: 'FedEx', accent: '#4D148C' },
];

export function CarrierList() {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Supported Carriers</Text>
      <View style={styles.list}>
        {CARRIERS.map((carrier) => (
          <View key={carrier.name} style={styles.row}>
            <View style={[styles.logo, { backgroundColor: carrier.accent }]}>
              <Text style={styles.logoText}>{carrier.name[0]}</Text>
            </View>
            <Text style={styles.name}>{carrier.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heading: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  list: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: colors.white,
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13,
  },
  name: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: colors.text,
  },
});
