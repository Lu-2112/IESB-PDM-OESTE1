import { useMemo } from 'react';
import { View } from 'react-native';
import { useAppTheme } from '../context/theme-context';
import { useExpenses } from '../store/expenses-context';
import DespesaLista from '../components/despesa/DespesaLista';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();
  const { colors } = useAppTheme();

  const recent = useMemo(() => {
    const limit = new Date();
    limit.setDate(limit.getDate() - 7);
    limit.setHours(0, 0, 0, 0);
    return expenses.filter((e) => new Date(e.date) >= limit);
  }, [expenses]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <DespesaLista expenses={recent} />
    </View>
  );
}