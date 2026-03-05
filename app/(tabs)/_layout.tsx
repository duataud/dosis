import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabsLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme as 'light' | 'dark'];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.background}
      iconColor={{
        default: colors.tabIconDefault,
        selected: colors.tabIconSelected,
      }}
      labelStyle={{
        default: { color: colors.tabIconDefault },
        selected: { color: colors.tabIconSelected },
      }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Inicio</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={<NativeTabs.Trigger.VectorIcon family={MaterialCommunityIcons} name="home" />}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Ajustes</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={<NativeTabs.Trigger.VectorIcon family={MaterialCommunityIcons} name="cog" />}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
