import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DESPESAS_INICIAIS } from '../data/despesas';

const CHAVE = '@gerenciador-despesas:despesas';

export const DespesasContext = createContext({
  despesas: [],
  adicionarDespesa: () => {},
  atualizarDespesa: () => {},
  excluirDespesa: () => {},
});

export default function DespesasProvider({ children }) {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);
  const [carregado, setCarregado] = useState(false);

  // Ao abrir o app: carrega as despesas salvas
  useEffect(() => {
    async function carregar() {
      try {
        const texto = await AsyncStorage.getItem(CHAVE);
        if (texto) {
          const lista = JSON.parse(texto).map((d) => ({
            ...d,
            data: new Date(d.data), // o JSON guarda a data como texto
          }));
          setDespesas(lista);
        }
      } catch (erro) {
        console.log('Erro ao carregar despesas:', erro);
      } finally {
        setCarregado(true);
      }
    }
    carregar();
  }, []);

  // Sempre que a lista mudar: salva
  useEffect(() => {
    if (!carregado) return; // evita apagar os dados antes de carregar
    AsyncStorage.setItem(CHAVE, JSON.stringify(despesas)).catch((erro) =>
      console.log('Erro ao salvar despesas:', erro)
    );
  }, [despesas, carregado]);

  function adicionarDespesa(dados) {
    setDespesas((atual) => [{ ...dados, id: Date.now().toString() }, ...atual]);
  }

  function atualizarDespesa(id, dados) {
    setDespesas((atual) => atual.map((d) => (d.id === id ? { ...d, ...dados } : d)));
  }

  function excluirDespesa(id) {
    setDespesas((atual) => atual.filter((d) => d.id !== id));
  }

  return (
    <DespesasContext.Provider
      value={{ despesas, adicionarDespesa, atualizarDespesa, excluirDespesa }}
    >
      {children}
    </DespesasContext.Provider>
  );
}