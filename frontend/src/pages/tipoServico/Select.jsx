import React from 'react';
import DataSelect from '../../components/DataSelect';

export default function TipoServicoSelect(props) {

  return (
    <DataSelect {...props}
      admin={false}
      url='/tipo-servico/listagem'
      format='descricao' />
  );
}