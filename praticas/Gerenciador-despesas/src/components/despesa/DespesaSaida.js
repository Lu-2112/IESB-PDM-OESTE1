import { StyleSheet, Text, View } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

export default function DespesaSaida({ despesas, periodo, textoFallback }) {
  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      {despesas.length > 0 ? (
        <DespesaLista despesas={despesas} />
      ) : (
        <Text style={styles.fallback}>{textoFallback}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  fallback: { textAlign: 'center', marginTop: 32, fontSize: 16, color: '#666' },
});