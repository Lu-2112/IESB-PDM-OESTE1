import { useContext } from 'react';
import { DespesasContext } from '../store/despesas-context';
import { getDataMenosDias } from '../util/data';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes() {
  const { despesas } = useContext(DespesasContext);

  const recentes = despesas.filter((d) => d.data >= getDataMenosDias(new Date(), 7));

  return (
    <DespesaSaida
      despesas={recentes}
      periodo="Últimos 7 dias"
      textoFallback="Nenhuma despesa nos últimos 7 dias."
    />
  );
}