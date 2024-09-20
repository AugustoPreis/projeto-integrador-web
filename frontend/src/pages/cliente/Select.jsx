import React from 'react';
import DataSelect from '../../components/DataSelect';

export default function ClienteSelect(props) {

  return (
    <DataSelect {...props}
      url='/cliente/listagem'
      format='nome' />
  );
}