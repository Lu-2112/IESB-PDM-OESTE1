import { useContext, useLayoutEffect, useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DespesasContext } from '../store/despesas-context';
import { CATEGORIAS } from '../data/despesas';
import { getDataFormatada, converterTextoEmData } from '../util/data';

// Alert.alert não funciona na web, então usamos window.alert lá
function mostrarAlerta(titulo, mensagem) {
  if (Platform.OS === 'web') window.alert(`${titulo}\n${mensagem}`);
  else Alert.alert(titulo, mensagem);
}

export default function GerenciarDespesa({ route, navigation }) {
  const { despesas, adicionarDespesa, atualizarDespesa, excluirDespesa } =
    useContext(DespesasContext);

  const despesaId = route.params?.despesaId;
  const editando = !!despesaId;
  const despesaEditada = despesas.find((d) => d.id === despesaId);

  const [descricao, setDescricao] = useState(despesaEditada?.descricao ?? '');
  const [valor, setValor] = useState(despesaEditada ? despesaEditada.valor.toString() : '');
  const [data, setData] = useState(despesaEditada?.data ?? new Date());
  const [categoria, setCategoria] = useState(despesaEditada?.categoria ?? '');
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [textoData, setTextoData] = useState(getDataFormatada(despesaEditada?.data ?? new Date()));

  useLayoutEffect(() => {
    navigation.setOptions({ title: editando ? 'Editar Despesa' : 'Nova Despesa' });
  }, [navigation, editando]);

  // Regex: só dígitos e no máximo duas casas decimais
  function tratarValor(texto) {
    const normalizado = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalizado)) {
      setValor(normalizado);
    }
  }

  // Mobile: DateTimePicker
  function aoMudarData(evento, dataSelecionada) {
    setMostrarPicker(Platform.OS === 'ios');
    if (dataSelecionada) setData(dataSelecionada);
  }

  // Web: campo de texto AAAA-MM-DD
  function aoDigitarData(texto) {
    setTextoData(texto);
    const nova = converterTextoEmData(texto);
    if (nova) setData(nova);
  }

  function salvar() {
    const valorNumerico = parseFloat(valor);

    if (!descricao.trim() || !valor || isNaN(valorNumerico) || valorNumerico <= 0 || !categoria) {
      mostrarAlerta('Dados inválidos', 'Preencha descrição, valor e categoria.');
      return;
    }

    if (Platform.OS === 'web' && !converterTextoEmData(textoData)) {
      mostrarAlerta('Data inválida', 'Use o formato AAAA-MM-DD.');
      return;
    }

    const dados = { descricao: descricao.trim(), valor: valorNumerico, data, categoria };

    if (editando) atualizarDespesa(despesaId, dados);
    else adicionarDespesa(dados);

    navigation.goBack();
  }

  function confirmarExclusao() {
    function excluir() {
      excluirDespesa(despesaId);
      navigation.goBack();
    }

    if (Platform.OS === 'web') {
      if (window.confirm('Deseja realmente excluir esta despesa?')) excluir();
    } else {
      Alert.alert('Excluir despesa', 'Deseja realmente excluir esta despesa?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: excluir },
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex: Almoço"
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={tratarValor}
        keyboardType="decimal-pad"
        placeholder="0.00"
        maxLength={10}
      />

      <Text style={styles.label}>Data</Text>
      {Platform.OS === 'web' ? (
        <TextInput
          style={styles.input}
          value={textoData}
          onChangeText={aoDigitarData}
          placeholder="AAAA-MM-DD"
        />
      ) : (
        <>
          <Pressable style={styles.input} onPress={() => setMostrarPicker(true)}>
            <Text>{getDataFormatada(data)}</Text>
          </Pressable>
          {mostrarPicker && (
            <DateTimePicker value={data} mode="date" display="default" onChange={aoMudarData} />
          )}
        </>
      )}

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categorias}>
        {CATEGORIAS.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setCategoria(cat)}
            style={[styles.chip, categoria === cat && styles.chipAtivo]}
          >
            <Text style={[styles.chipTexto, categoria === cat && styles.chipTextoAtivo]}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.botoes}>
        <Pressable style={[styles.botao, styles.cancelar]} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoTexto}>Cancelar</Text>
        </Pressable>
        <Pressable style={[styles.botao, styles.salvar]} onPress={salvar}>
          <Text style={styles.botaoTexto}>{editando ? 'Atualizar' : 'Adicionar'}</Text>
        </Pressable>
      </View>

      {editando && (
        <View style={styles.excluirBox}>
          <Pressable style={[styles.botao, styles.excluir]} onPress={confirmarExclusao}>
            <Text style={styles.botaoTexto}>Excluir despesa</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff',
  },
  categorias: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, backgroundColor: '#e0e0e0' },
  chipAtivo: { backgroundColor: '#d6336c' },
  chipTexto: { color: '#333' },
  chipTextoAtivo: { color: '#fff', fontWeight: 'bold' },
  botoes: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 24 },
  botao: { minWidth: 120, padding: 12, borderRadius: 6, alignItems: 'center' },
  cancelar: { backgroundColor: '#999' },
  salvar: { backgroundColor: '#d6336c' },
  excluirBox: { alignItems: 'center', marginTop: 16 },
  excluir: { backgroundColor: '#b02a37' },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});