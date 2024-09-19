import React from 'react';
import DataSelect from '../../components/DataSelect';

export default function ProdutoSelect(props) {

  return (
    <DataSelect {...props}
      url='/produto/listagem'
      format='nome' />
  );
}