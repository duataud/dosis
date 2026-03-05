import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabsLayout() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        tabBarStyle: [
          styles.tabBar,
          Platform.OS === 'ios' ? styles.tabBarIos : styles.tabBarAndroid,
          {
            backgroundColor: isDark ? 'rgba(24,24,24,0.78)' : 'rgba(255,255,255,0.72)',
            borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
          },
        ],
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <IconSymbol name="house.fill" color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => <IconSymbol name="gearshape.fill" color={color} size={22} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    paddingTop: 8,
    paddingBottom: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tabBarIos: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 14,
    borderRadius: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  tabBarAndroid: {
    elevation: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
