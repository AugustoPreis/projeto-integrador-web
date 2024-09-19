import React from 'react';
import DataSelect from '../../components/DataSelect';

export default function TipoServicoSelect(props) {

  return (
    <DataSelect {...props}
      url='/tipo-servico/listagem'
      format='descricao' />
  );
}