import React from 'react';
import DataSelect from '../../components/DataSelect';

export default function ProdutoSelect(props) {

  return (
    <DataSelect {...props}
      admin={false}
      url='/produto/listagem'
      format='nome' />
  );
}