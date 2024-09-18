import React from 'react';
import DataSelect from '../../components/DataSelect';

function FuncaoSelect(props) {

  return (
    <DataSelect {...props}
      url='/funcao/listagem'
      format='descricao' />
  );
}

export default FuncaoSelect;