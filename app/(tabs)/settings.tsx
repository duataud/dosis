import { GlassView, isGlassEffectAPIAvailable, isLiquidGlassAvailable } from 'expo-glass-effect';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Switch, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme, useSetColorScheme } from '@/hooks/use-color-scheme';

export default function SettingsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const setColorScheme = useSetColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === 'dark';
  const [glassTapCount, setGlassTapCount] = useState(0);
  const [isClearStyle, setIsClearStyle] = useState(false);
  const hasNativeGlass = isLiquidGlassAvailable() && isGlassEffectAPIAvailable();
  const isGlassInteractive = true;

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

        <View style={cardStyle}>
          <View style={styles.row}>
            <ThemedText type="defaultSemiBold">Modo oscuro</ThemedText>
            <Switch
              value={isDark}
              onValueChange={(value) => setColorScheme(value ? 'dark' : 'light')}
              trackColor={{
                false: '#D1D5DB',
                true: Colors[isDark ? 'dark' : 'light'].tint,
              }}
            />
          </View>
        </View>

        <Pressable
          style={styles.glassButtonPressable}
          onPress={() => {
            setGlassTapCount((prev) => prev + 1);
            setIsClearStyle((prev) => !prev);
          }}>
          {hasNativeGlass ? (
            <GlassView
              key={`glass-${isGlassInteractive ? 'interactive' : 'static'}`}
              style={styles.glassButton}
              glassEffectStyle={{
                style: isClearStyle ? 'clear' : 'regular',
                animate: true,
                animationDuration: 0.25,
              }}
              colorScheme={isDark ? 'dark' : 'light'}
              isInteractive={isGlassInteractive}>
              <ThemedText type="defaultSemiBold">Boton Glass</ThemedText>
              <ThemedText style={styles.glassSubtitle}>Toques: {glassTapCount}</ThemedText>
            </GlassView>
          ) : (
            <View style={styles.glassFallback}>
              <ThemedText type="defaultSemiBold">Boton Glass (fallback)</ThemedText>
              <ThemedText style={styles.glassSubtitle}>Toques: {glassTapCount}</ThemedText>
            </View>
          )}
        </Pressable>
        {!hasNativeGlass && (
          <ThemedText style={styles.glassHint}>
            Liquid Glass no esta disponible en este dispositivo o version de iOS.
          </ThemedText>
        )}
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
    backgroundColor: 'rgba(6, 16, 35, 0.18)',
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
  glassButtonPressable: {
    marginTop: 16,
    width: '100%',
  },
  glassButton: {
    width: '100%',
    minHeight: 98,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.42)',
  },
  glassSubtitle: {
    marginTop: 4,
    opacity: 0.8,
  },
  glassFallback: {
    width: '100%',
    minHeight: 98,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
  },
  glassHint: {
    marginTop: 10,
    fontSize: 12,
    opacity: 0.85,
  },
});
