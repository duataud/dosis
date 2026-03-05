import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme, useSetColorScheme } from '@/hooks/use-color-scheme';
import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const [, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [smoothedData, setSmoothedData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const colorScheme = useColorScheme() ?? 'light';
  const setColorScheme = useSetColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === 'dark';

  const [subscription, setSubscription] = useState<ReturnType<
    typeof Accelerometer.addListener
  > | null>(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((nextData) => {
        setData(nextData);
        setSmoothedData((prev) => {
          const smoothingFactor = 0.2;
          return {
            x: prev.x + (nextData.x - prev.x) * smoothingFactor,
            y: prev.y + (nextData.y - prev.y) * smoothingFactor,
            z: prev.z + (nextData.z - prev.z) * smoothingFactor,
          };
        });
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const cardStyle = [
    styles.card,
    {
      backgroundColor: isDark ? 'rgba(24,24,24,0.78)' : 'rgba(255,255,255,0.75)',
      borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.backgroundOverlay} />

      <ThemedView
        style={[
          styles.container,
          { paddingBottom: insets.bottom + 110, backgroundColor: 'transparent' },
        ]}>
        <View style={styles.header}>
          <ThemedText type="title">Configuración</ThemedText>
          <ThemedText style={styles.subtitle}>Ajusta el tema visual.</ThemedText>
        </View>

        <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
      <Text style={styles.text}>x: {smoothedData.x.toFixed(2)}</Text>
      <Text style={styles.text}>y: {smoothedData.y.toFixed(2)}</Text>
      <Text style={styles.text}>z: {smoothedData.z.toFixed(2)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6, 16, 35, 0.35)',
  },
  text: {
    textAlign: 'center',
    color:"#fff"
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  subtitle: {
    marginTop: 6,
    opacity: 0.7,
  },
  card: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
});
