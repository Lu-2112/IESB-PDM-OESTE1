import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';
const ExpensesContext = createContext(null);

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((e) => (e.id === action.payload.id ? { ...e, ...action.payload.data } : e));
    case 'DELETE':
      return state.filter((e) => e.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega os dados salvos ao iniciar
  useEffect(() => {
    async function load() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) dispatch({ type: 'SET', payload: JSON.parse(stored) });
      } catch (error) {
        console.error('Erro ao ler despesas:', error);
      } finally {
        setIsLoaded(true);
      }
    }
    load();
  }, []);

  // Salva a cada alteração (só depois de carregar, para não sobrescrever com [])
  useEffect(() => {
    if (!isLoaded) return;
    async function save() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.error('Erro ao salvar despesas:', error);
      }
    }
    save();
  }, [expenses, isLoaded]);

  const addExpense = useCallback((data) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    dispatch({ type: 'ADD', payload: { id, ...data } });
  }, []);

  const updateExpense = useCallback((id, data) => {
    dispatch({ type: 'UPDATE', payload: { id, data } });
  }, []);

  const deleteExpense = useCallback((id) => {
    dispatch({ type: 'DELETE', payload: id });
  }, []);

  const clearExpenses = useCallback(() => {
    dispatch({ type: 'SET', payload: [] });
  }, []);

  const value = useMemo(
    () => ({ expenses, addExpense, updateExpense, deleteExpense, clearExpenses }),
    [expenses, addExpense, updateExpense, deleteExpense, clearExpenses]
  );

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider.');
  }
  return context;
}