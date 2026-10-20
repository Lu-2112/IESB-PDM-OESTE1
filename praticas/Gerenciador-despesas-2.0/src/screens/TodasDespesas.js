import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CATEGORIES } from '../constants/theme';
import { useAppTheme } from '../context/theme-context';
import { useExpenses } from '../store/expenses-context';
import useDebounce from '../hooks/useDebounce';
import DespesaLista from '../components/despesa/DespesaLista';

const FILTERS = ['Todas', ...CATEGORIES];

export default function TodasDespesas() {
  const { expenses } = useExpenses();
  const { colors } = useAppTheme();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    return expenses.filter((e) => {
      const matchesText = !term || e.description.toLowerCase().includes(term);
      const matchesCategory = selectedCategory === 'Todas' || e.category === selectedCategory;
      return matchesText && matchesCategory;
    });
  }, [expenses, debouncedSearch, selectedCategory]);

  const header = (
    <View>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar por descrição..."
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.chips}
      >
        {FILTERS.map((cat) => {
          const active = cat === selectedCategory;
          return (
            <Pressable
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.chip,
                {
                  backgroundColor: active ? colors.primary : colors.card,
                  borderColor: active ? colors.primary : colors.border,
                },
              ]}
            >
              <Text style={{ color: active ? '#fff' : colors.text, fontWeight: active ? '700' : '400' }}>
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <DespesaLista expenses={filtered} header={header} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: { margin: 16, marginBottom: 0, padding: 12, borderRadius: 10, borderWidth: 1, fontSize: 16 },
  chips: { paddingHorizontal: 16, paddingTop: 12, gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
});