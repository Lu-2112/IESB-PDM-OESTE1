import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTheme } from '../constants/theme';

const STORAGE_KEY = '@theme-mode';
const ThemeContext = createContext(null);

export function ThemeContextProvider({ children }) {
  const systemScheme = useColorScheme();
  const [override, setOverride] = useState(null); // null = segue o sistema

  // Carrega a escolha manual salva
  useEffect(() => {
    async function load() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') setOverride(stored);
      } catch (error) {
        console.error('Erro ao ler tema:', error);
      }
    }
    load();
  }, []);

  const scheme = override ?? (systemScheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = useCallback(async () => {
    const next = scheme === 'dark' ? 'light' : 'dark';
    setOverride(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, next);
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  }, [scheme]);

  const value = useMemo(
    () => ({ scheme, isDark: scheme === 'dark', colors: getTheme(scheme), toggleTheme }),
    [scheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme deve ser usado dentro de um ThemeContextProvider.');
  }
  return context;
}