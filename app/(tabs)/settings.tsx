import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Switch, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme, useSetColorScheme } from '@/hooks/use-color-scheme';

export default function SettingsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const setColorScheme = useSetColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === 'dark';

  const cardStyle = [
    styles.card,
    {
      backgroundColor: isDark ? 'rgba(24,24,24,0.78)' : 'rgba(255,255,255,0.75)',
      borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ThemedView style={[styles.container, { paddingBottom: insets.bottom + 110 }]}>
        <View style={styles.header}>
          <ThemedText type="title">Configuración</ThemedText>
          <ThemedText style={styles.subtitle}>Ajusta el tema visual.</ThemedText>
        </View>

        <View style={cardStyle}>
          <View style={styles.row}>
            <ThemedText type="defaultSemiBold">Modo oscuro</ThemedText>
            <Switch
              value={isDark}
              onValueChange={(value) => setColorScheme(value ? 'dark' : 'light')}
              trackColor={{
                false: '#D1D5DB',
                true: Colors[colorScheme].tint,
              }}
            />
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
