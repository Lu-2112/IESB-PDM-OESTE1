import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as labels from './labels';
import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados !== null) {
          setCompromissos(JSON.parse(dados));
        }
      } catch (e) {
        Alert.alert("Erro", "Falha ao carregar compromissos.");
      }
    };
    carregarDados();
  }, []);

  useEffect(() => {
    const salvarDados = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (e) {
        Alert.alert("Erro", "Falha ao salvar compromissos.");
      }
    };
    salvarDados();
  }, [compromissos]);

  const handleAdd = () => {
    if (texto.trim() === '') {
      Alert.alert("Aviso", "Digite algum compromisso antes de adicionar.");
      return;
    }
    const novoItem = {
      id: Date.now().toString(),
      texto: texto.trim(),
      criadoEm: new Date().toISOString()
    };
    setCompromissos([...compromissos, novoItem]);
    setTexto('');
  };

  const handleDelete = (id) => {
    setCompromissos(compromissos.filter(item => item.id !== id));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
          <Text style={styles.headerTitle}>{labels.tituloApp}</Text>
        </View>

        <CompromissoInput
          value={texto}
          onChangeText={setTexto}
          onAdd={handleAdd}
          labels={labels}
        />

        <CompromissoList
          itens={compromissos}
          onDelete={handleDelete}
          tituloLista={labels.tituloLista}
          listaVazia={labels.listaVazia}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});