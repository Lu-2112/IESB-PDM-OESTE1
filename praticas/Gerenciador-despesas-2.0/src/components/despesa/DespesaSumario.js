import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../context/theme-context';
import DespesaSaida from './DespesaSaida';

export default function DespesaSumario({ expenses }) {
  const { colors } = useAppTheme();
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <View style={[styles.box, { backgroundColor: colors.card }]}>
      <Text style={{ color: colors.textSecondary }}>
        {expenses.length} {expenses.length === 1 ? 'despesa' : 'despesas'}
      </Text>
      <DespesaSaida value={total} style={[styles.total, { color: colors.text }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flexDirection: 'row', justifyContent: 'space-between', padding: 14, margin: 16, borderRadius: 12 },
  total: { fontSize: 16, fontWeight: 'bold' },
});