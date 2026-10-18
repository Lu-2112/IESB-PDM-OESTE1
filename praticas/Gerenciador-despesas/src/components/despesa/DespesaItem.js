import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataFormatada } from '../../util/data';

export default function DespesaItem({ id, descricao, valor, data, categoria }) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('GerenciarDespesa', { despesaId: id })}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.descricao}>{descricao}</Text>
          <Text style={styles.data}>{getDataFormatada(data)}</Text>
          <View style={styles.tag}>
            <Text style={styles.tagTexto}>{categoria}</Text>
          </View>
        </View>
        <View style={styles.valorBox}>
          <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.7 },
  item: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#d6336c',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    elevation: 3,
  },
  info: { flex: 1 },
  descricao: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  data: { color: '#fde4ef', marginBottom: 6 },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  tagTexto: { fontSize: 12, color: '#333', fontWeight: '600' },
  valorBox: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 4,
    justifyContent: 'center',
    minWidth: 90,
    alignItems: 'center',
  },
  valor: { fontWeight: 'bold', color: '#d6336c' },
});