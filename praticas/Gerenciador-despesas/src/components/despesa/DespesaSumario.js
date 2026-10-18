import { StyleSheet, Text, View } from 'react-native';

export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + item.valor, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.soma, somaDespesas > 200 && styles.somaAlta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fde4ef',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  periodo: { fontSize: 14, color: '#c2255c' },
  soma: { fontSize: 16, fontWeight: 'bold', color: '#d6336c' },
  somaAlta: { color: 'red' }, // bônus: acima de R$ 200,00
});