import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
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
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Lunes']);
  const [selectedHour, setSelectedHour] = useState('08');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  const hours = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, '0'));
  const minutes = ['00', '15', '30', '45'];
  const allDaysSelected = selectedDays.length === days.length;

  const toggleAllDays = () => {
    setSelectedDays((previous) => (previous.length === days.length ? ['Lunes'] : days));
  };

  const toggleDay = (day: string) => {
    setSelectedDays((previous) => {
      const hasDay = previous.includes(day);
      if (hasDay) {
        if (previous.length === 1) return previous;
        return previous.filter((value) => value !== day);
      }
      return [...previous, day];
    });
  };

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
          { backgroundColor: 'transparent' },
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 110 }]}>
          <View style={styles.header}>
            <ThemedText type="title">Configuración</ThemedText>
            <ThemedText style={styles.subtitle}>Ajusta el tema y la frase diaria.</ThemedText>
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

          <View style={[cardStyle, styles.notificationsCard]}>
            <View style={styles.row}>
              <ThemedText type="defaultSemiBold">Activar notificaciones</ThemedText>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{
                  false: '#D1D5DB',
                  true: Colors[isDark ? 'dark' : 'light'].tint,
                }}
              />
            </View>

            {/* <ThemedText style={styles.notificationsHint}>
              Simulación de expo-notifications (sin programación real por ahora).
            </ThemedText> */}

            {notificationsEnabled ? (
              <View style={styles.notificationsControls}>
                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                  Días para la frase diaria
                </ThemedText>
                <View style={styles.chipWrap}>
                  <Pressable
                    onPress={toggleAllDays}
                    style={[styles.chip, allDaysSelected && styles.chipSelected]}>
                    <ThemedText
                      style={[
                        styles.chipLabel,
                        allDaysSelected && styles.chipLabelSelected,
                      ]}>
                      Todos
                    </ThemedText>
                  </Pressable>
                  {days.map((day) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <Pressable
                        key={day}
                        onPress={() => toggleDay(day)}
                        style={[styles.chip, isSelected && styles.chipSelected]}>
                        <ThemedText
                          style={[
                            styles.chipLabel,
                            isSelected && styles.chipLabelSelected,
                          ]}>
                          {day}
                        </ThemedText>
                      </Pressable>
                    );
                  })}
                </View>

                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                  Hora de envío
                </ThemedText>
                <View style={styles.timeOptionRow}>
                  <ThemedText style={styles.timeOptionLabel}>Hora</ThemedText>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.timeChipsRow}>
                    {hours.map((hour) => {
                      const isSelected = selectedHour === hour;
                      return (
                        <Pressable
                          key={hour}
                          onPress={() => setSelectedHour(hour)}
                          style={[styles.timeChip, isSelected && styles.chipSelected]}>
                          <ThemedText
                            style={[
                              styles.chipLabel,
                              isSelected && styles.chipLabelSelected,
                            ]}>
                            {hour}
                          </ThemedText>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                </View>
                <View style={styles.timeOptionRow}>
                  <ThemedText style={styles.timeOptionLabel}>Min</ThemedText>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.timeChipsRow}>
                    {minutes.map((minute) => {
                      const isSelected = selectedMinute === minute;
                      return (
                        <Pressable
                          key={minute}
                          onPress={() => setSelectedMinute(minute)}
                          style={[styles.timeChip, isSelected && styles.chipSelected]}>
                          <ThemedText
                            style={[
                              styles.chipLabel,
                              isSelected && styles.chipLabelSelected,
                            ]}>
                            {minute}
                          </ThemedText>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                </View>

                <ThemedText style={styles.summaryText}>
                  Frase diaria programada:{' '}
                  {allDaysSelected ? 'Todos los días' : selectedDays.join(', ')}, {selectedHour}:
                  {selectedMinute}
                </ThemedText>
              </View>
            ) : (
              <ThemedText style={styles.disabledText}>
                Notificaciones desactivadas.
              </ThemedText>
            )}
          </View>
        </ScrollView>
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
  },
  scrollContent: {
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
  notificationsCard: {
    marginTop: 16,
  },
  notificationsHint: {
    marginTop: 6,
    opacity: 0.75,
    fontSize: 13,
  },
  notificationsControls: {
    marginTop: 10,
    gap: 8,
  },
  sectionTitle: {
    marginTop: 6,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 2,
  },
  chip: {
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(148, 163, 184, 0.22)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.35)',
  },
  timeChip: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minWidth: 62,
    alignItems: 'center',
    backgroundColor: 'rgba(148, 163, 184, 0.22)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.35)',
  },
  chipSelected: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  chipLabel: {
    fontSize: 15,
    lineHeight: 20,
  },
  chipLabelSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  timeOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timeOptionLabel: {
    width: 44,
    opacity: 0.75,
    fontSize: 13,
  },
  timeChipsRow: {
    gap: 8,
    paddingRight: 8,
  },
  summaryText: {
    marginTop: 10,
    fontSize: 14,
    opacity: 0.9,
  },
  disabledText: {
    marginTop: 8,
    opacity: 0.7,
  },
});
