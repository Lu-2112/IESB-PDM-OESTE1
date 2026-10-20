import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../context/theme-context';
import DespesaSaida from './DespesaSaida';

export default function DespesaItem({ expense }) {
  const navigation = useNavigation();
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: expense.id })}
      style={({ pressed }) => [styles.card, { backgroundColor: colors.card }, pressed && { opacity: 0.7 }]}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.description, { color: colors.text }]}>{expense.description}</Text>
        <Text style={{ color: colors.textSecondary }}>
          {expense.category} · {new Date(expense.date).toLocaleDateString('pt-BR')}
        </Text>
      </View>
      <DespesaSaida value={expense.amount} style={[styles.amount, { color: colors.primary }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  description: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
  amount: { fontSize: 16, fontWeight: 'bold' },
});