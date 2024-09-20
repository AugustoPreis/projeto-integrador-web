export function getStatusStyle(status) {
  switch (status) {
    case 'PENDENTE':
      return {
        color: '#856d04',
        label: 'Pendente',
      };
    case 'ABERTO':
      return {
        color: '#087fa3',
        label: 'Aberto',
      };
    case 'EM PROGRESSO':
      return {
        color: '#110bbf',
        label: 'Em Progresso',
      };
    case 'FINALIZADO':
      return {
        color: '#187308',
        label: 'Finalizado',
      };
    case 'CANCELADO':
      return {
        color: '#ab451d',
        label: 'Cancelado',
      };
  }

  //yellow green blue

  return { color: '#eb3434', label: 'Inválido' };
}