import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, TouchableOpacity } from 'react-native';
import phrases from '../../data.json';

type Phrase = {
    frase: string;
    fuente: string;
    estilo: string;
};

export default function PhraseScreen() {
    const { category } = useLocalSearchParams<{ category: string }>();
    const [phrase, setPhrase] = useState<Phrase | null>(null);
    const spinAnim = useRef(new Animated.Value(0)).current;
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
    const accentColor = category ? categoryColors[category] ?? '#22c55e' : '#22c55e';

    const getRandomPhrase = useCallback(() => {
        if (category && phrases[category as keyof typeof phrases]) {
            const categoryPhrases = phrases[category as keyof typeof phrases];
            const randomIndex = Math.floor(Math.random() * categoryPhrases.length);
            setPhrase(categoryPhrases[randomIndex]);
        }
    }, [category]);

    useEffect(() => {
        getRandomPhrase();
    }, [category, getRandomPhrase]);

    const triggerSpin = () => {
        spinAnim.setValue(0);
        Animated.timing(spinAnim, {
            toValue: 1,
            duration: 700,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
        }).start();
    };

    if (!phrase) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText style={styles.loadingText}>Cargando frases...</ThemedText>
            </ThemedView>
        );
    }

    return (
            <ThemedView style={styles.container}>
                <ThemedView style={styles.header}>
                    <ThemedText type="title" style={styles.title}>
                        {category?.replace(/_/g, ' ')}
                    </ThemedText>
                    <ThemedText style={styles.subtitle}>Una dosis rápida para el día</ThemedText>
                </ThemedView>
                <ThemedView style={styles.phraseCard}>
                    <ThemedText style={[styles.quoteMark, { color: accentColor }]}>{'“'}</ThemedText>
                    <ThemedText style={styles.phrase}>{phrase.frase}</ThemedText>
                    <ThemedView style={styles.metaRow}>
                        <ThemedText style={styles.source}>— {phrase.fuente}</ThemedText>
                        <ThemedView style={[styles.badge, { backgroundColor: accentColor }]}>
                            <ThemedText style={styles.badgeText}>
                                {phrase.estilo || 'Clásico'}
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        triggerSpin();
                        getRandomPhrase();
                    }}
                >
                    <Animated.View
                        style={{
                            transform: [
                                {
                                    rotate: spinAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '360deg'],
                                    }),
                                },
                            ],
                        }}
                    >
                        <FontAwesome name="refresh" size={18} color="#fff" />
                    </Animated.View>
                    {/* <ThemedText style={styles.buttonText}>Otra frase</ThemedText> */}
                </TouchableOpacity>
            </ThemedView>
        
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 24,
    },
    loadingText: {
        fontSize: 18,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        textTransform: 'capitalize',
        fontSize: 28,
        letterSpacing: 0.4,
    },
    subtitle: {
        marginTop: 6,
        opacity: 0.65,
        fontSize: 13,
    },
    phraseCard: {
        borderRadius: 18,
        paddingVertical: 26,
        paddingHorizontal: 22,
        marginBottom: 28,
        width: '100%',
    },
    quoteMark: {
        fontSize: 36,
        opacity: 0.25,
        marginBottom: 10,
        textAlign: 'left',
    },
    phrase: {
        fontSize: 22,
        textAlign: 'left',
        marginBottom: 18,
        fontStyle: 'italic',
        lineHeight: 30,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    source: {
        fontSize: 15,
        opacity: 0.8,
        flex: 1,
    },
    badge: {
        backgroundColor: '#16a34a',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },
    badgeText: {
        color: '#fff',
        fontSize: 11,
        letterSpacing: 0.4,
        textTransform: 'uppercase',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#111827',
        paddingVertical: 12,
        paddingHorizontal: 22,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
        fontWeight: '600',
    },
});
