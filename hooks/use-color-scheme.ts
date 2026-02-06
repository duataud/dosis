import { createContext, createElement, ReactNode, useContext, useMemo, useState } from 'react';
import { ColorSchemeName, useColorScheme as useSystemColorScheme } from 'react-native';

type ColorSchemeContextValue = {
  colorScheme: ColorSchemeName;
  setColorScheme: (scheme: ColorSchemeName) => void;
};

const ColorSchemeContext = createContext<ColorSchemeContextValue | null>(null);

export function ColorSchemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useSystemColorScheme() ?? 'light';
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(systemScheme);
  const value = useMemo(
    () => ({ colorScheme, setColorScheme }),
    [colorScheme, setColorScheme]
  );

  return createElement(ColorSchemeContext.Provider, { value }, children);
}

export function useColorScheme() {
  const systemScheme = useSystemColorScheme() ?? 'light';
  const context = useContext(ColorSchemeContext);
  return context?.colorScheme ?? systemScheme;
}

export function useSetColorScheme() {
  const context = useContext(ColorSchemeContext);
  if (!context) {
    throw new Error('useSetColorScheme must be used within ColorSchemeProvider');
  }
  return context.setColorScheme;
}
