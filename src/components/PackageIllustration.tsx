import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';

export function PackageIllustration() {
  return (
    <View style={styles.wrap} pointerEvents="none">
      <View style={styles.arc} />
      <View style={[styles.box, styles.boxBack]} />
      <View style={[styles.box, styles.boxMid]} />
      <View style={[styles.box, styles.boxFront]}>
        <View style={styles.tapeH} />
        <View style={styles.tapeV} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 140,
    height: 110,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  arc: {
    position: 'absolute',
    top: 8,
    width: 110,
    height: 55,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    opacity: 0.55,
  },
  box: {
    position: 'absolute',
    backgroundColor: '#D4A574',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#B8895A',
  },
  boxBack: {
    width: 48,
    height: 40,
    right: 18,
    bottom: 28,
    backgroundColor: '#C4935E',
    transform: [{ rotate: '8deg' }],
  },
  boxMid: {
    width: 52,
    height: 44,
    left: 16,
    bottom: 22,
    backgroundColor: '#E0B07A',
    transform: [{ rotate: '-6deg' }],
  },
  boxFront: {
    width: 58,
    height: 50,
    bottom: 8,
    backgroundColor: '#E8BC86',
    overflow: 'hidden',
  },
  tapeH: {
    position: 'absolute',
    top: 22,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: '#F5E6C8',
    opacity: 0.9,
  },
  tapeV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 26,
    width: 6,
    backgroundColor: '#F5E6C8',
    opacity: 0.9,
  },
});
