import { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DespesasContext } from '../store/despesas-context';
import { CATEGORIAS } from '../data/despesas';
import DespesaSaida from '../components/despesa/DespesaSaida';

function filtrarPorCategoria(despesas, categoria) {
  if (!categoria) return despesas; // '' = sem filtro
  return despesas.filter((despesa) => despesa.categoria === categoria);
}

export default function TodasDespesas() {
  const { despesas } = useContext(DespesasContext);
  const [filtro, setFiltro] = useState('');

  const despesasFiltradas = filtrarPorCategoria(despesas, filtro);

  return (
    <View style={styles.container}>
      <View style={styles.filtros}>
        {['', ...CATEGORIAS].map((cat) => (
          <Pressable
            key={cat || 'todas'}
            onPress={() => setFiltro(cat)}
            style={[styles.chip, filtro === cat && styles.chipAtivo]}
          >
            <Text style={[styles.chipTexto, filtro === cat && styles.chipTextoAtivo]}>
              {cat || 'Todas'}
            </Text>
          </Pressable>
        ))}
      </View>
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={filtro || 'Total'}
        textoFallback="Nenhuma despesa nesta categoria."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 8,
  },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: '#e0e0e0' },
  chipAtivo: { backgroundColor: '#d6336c' },
  chipTexto: { color: '#333' },
  chipTextoAtivo: { color: '#fff', fontWeight: 'bold' },
});