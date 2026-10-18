// Formata a data no fuso local como AAAA-MM-DD
export function getDataFormatada(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

export function getDataMenosDias(data, dias) {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate() - dias);
}

// Converte 'AAAA-MM-DD' em Date local (ou null se for inválida)
export function converterTextoEmData(texto) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) return null;
  const [ano, mes, dia] = texto.split('-').map(Number);
  const data = new Date(ano, mes - 1, dia);
  return isNaN(data.getTime()) ? null : data;
}