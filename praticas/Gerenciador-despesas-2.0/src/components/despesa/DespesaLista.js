import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../context/theme-context';
import DespesaItem from './DespesaItem';
import DespesaSumario from './DespesaSumario';

export default function DespesaLista({ expenses, header }) {
  const { colors } = useAppTheme();

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DespesaItem expense={item} />}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View>
          {header}
          <DespesaSumario expenses={expenses} />
        </View>
      }
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="receipt-outline" size={56} color={colors.primary} />
          <Text style={[styles.title, { color: colors.text }]}>Nenhuma despesa.</Text>
          <Text style={{ color: colors.textSecondary }}>Toque em + para adicionar.</Text>
        </View>
      }
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}

const styles = StyleSheet.create({
  empty: { alignItems: 'center', marginTop: 48, gap: 8 },
  title: { fontSize: 18, fontWeight: '600' },
});