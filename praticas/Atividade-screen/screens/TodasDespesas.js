import { View, Text, StyleSheet } from 'react-native';

export default function TodasDespesas() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Todas as Despesas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 20,
    color: '#d63384',
    fontWeight: 'bold',
  },
});