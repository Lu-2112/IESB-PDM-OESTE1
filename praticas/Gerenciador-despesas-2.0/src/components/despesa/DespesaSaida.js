import { Text } from 'react-native';

export default function DespesaSaida({ value, style }) {
  return (
    <Text style={style}>
      {value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
    </Text>
  );
}