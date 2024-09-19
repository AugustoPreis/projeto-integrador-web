import React from 'react';
import DataSelect from '../../components/DataSelect';

export default function FuncaoSelect(props) {

  return (
    <DataSelect {...props}
      url='/funcao/listagem'
      format='descricao' />
  );
}