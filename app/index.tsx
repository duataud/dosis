import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import phrases from '../data.json';

export default function HomeScreen() {
  const router = useRouter();
  const categories = Object.keys(phrases);
  const categoryColors: Record<string, string> = {
    superacion_personal: '#f97316',
    productividad_y_enfoque: '#2563eb',
    resiliencia: '#dc2626',
    autoestima_y_autoconfianza: '#e11d48',
    metas_y_logros: '#16a34a',
    mentalidad_posivita: '#f59e0b',
    liderazgo_y_equipo: '#0d9488',
    crecimiento_profesional_y_emprendimiento: '#7c3aed',
    bienestar_emocional: '#14b8a6',
    inspiracion_creativa: '#9333ea',
  };
  const getCategoryColor = (category: string) =>
    categoryColors[category] ?? '#22c55e';

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => router.push(`/phrases/${item}`)}>
      <ThemedView style={styles.categoryContainer}>
        <ThemedView style={[styles.cardAccent, { backgroundColor: getCategoryColor(item) }]} />
        <ThemedView style={styles.cardContent}>
          <ThemedText type="subtitle" style={styles.categoryTitle}>
            {item.replace(/_/g, ' ')}
          </ThemedText>
          <ThemedText style={styles.categoryHint}>Ver frases</ThemedText>
        </ThemedView>
        <ThemedText style={styles.cardChevron}>{'>'}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ThemedView style={styles.container}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Categorías</ThemedText>
            </ThemedView>
          }
        />
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
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  listContainer: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  categoryContainer: {
    flex: 1,
    margin: 8,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 100,
  },
  cardAccent: {
    width: 8,
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#22c55e',
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
  },
  categoryTitle: {
    letterSpacing: 0.3,
  },
  categoryHint: {
    marginTop: 6,
    opacity: 0.7,
    fontSize: 12,
  },
  cardChevron: {
    marginLeft: 12,
    opacity: 0.6,
    fontSize: 16,
  },
});
