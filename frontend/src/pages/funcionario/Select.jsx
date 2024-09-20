import React from 'react';
import DataSelect from '../../components/DataSelect';

export default function FuncionarioSelect(props) {

  return (
    <DataSelect {...props}
      url='/funcionario/listagem'
      format='nome' />
  );
}