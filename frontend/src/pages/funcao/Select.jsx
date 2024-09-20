import React from 'react';
import DataSelect from '../../components/DataSelect';

export default function FuncaoSelect(props) {

  return (
    <DataSelect {...props}
      admin={false}
      url='/funcao/listagem'
      format='descricao' />
  );
}