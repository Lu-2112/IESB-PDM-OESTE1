import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Switch,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LABELS } from './labels';

const DISCIPLINAS_INICIAIS = [
  { id: '1', nome: 'Programação para Dispositivos Móveis' },
  { id: '2', nome: 'Estrutura de Dados' },
  { id: '3', nome: 'Banco de Dados' },
];

export default function App() {
  const [apenasObrigatorias, setApenasObrigatorias] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Cabeçalho */}
        <Text style={styles.headerTitle}>{LABELS.appTitle}</Text>

        {/* Linha de Cadastro: TextInput (~70%) + Pressable (~28%) */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder={LABELS.inputPlaceholder}
            placeholderTextColor="#888"
          />
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed, // Desafio Extra: Estilo ao pressionar
            ]}
          >
            <Text style={styles.buttonText}>{LABELS.buttonText}</Text>
          </Pressable>
        </View>

        {/* Desafio Extra: Switch */}
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>{LABELS.filterSwitch}</Text>
          <Switch
            value={apenasObrigatorias}
            onValueChange={setApenasObrigatorias}
          />
        </View>

        {/* Seção da Lista */}
        <Text style={styles.listTitle}>{LABELS.listTitle}</Text>
        <ScrollView style={styles.listContainer}>
          {DISCIPLINAS_INICIAIS.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <Text style={styles.itemText}>{item.nome}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // flex: 1 faz o container preencher 100% do espaço vertical disponível na tela
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0F172A',
  },
  // flexDirection: 'row' organiza os elementos filho em linha horizontal
  // justifyContent: 'space-between' distribui o espaço entre o input e o botão
  // alignItems: 'center' alinha os elementos verticalmente pelo centro da linha
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  // Requisito D: Uso de largura percentual (%)
  input: {
    width: '70%',
    height: 48,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  // Requisito D: Uso de largura percentual (%)
  button: {
    width: '28%',
    height: 48,
    backgroundColor: '#2563EB',
    borderRadius: 8,
    // justifyContent e alignItems centralizam o texto dentro do botão
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#1D4ED8',
    opacity: 0.85,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 14,
    color: '#475569',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1E293B',
  },
  // flex: 1 faz a ScrollView preencher todo o espaço restante vertical da tela
  listContainer: {
    flex: 1,
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  itemText: {
    fontSize: 15,
    color: '#334155',
  },
});