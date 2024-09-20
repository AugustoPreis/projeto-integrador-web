import React from 'react';
import { Select } from 'antd';

export default function StatusSelect(props) {

  return (
    <Select {...props}
      style={{ width: '100%' }}
      options={[
        { value: 'PENDENTE', label: 'Pendente' },
        { value: 'ABERTO', label: 'Aberto' },
        { value: 'EM PROGRESSO', label: 'Em Progresso' },
        { value: 'FINALIZADO', label: 'Pendente' },
        { value: 'CANCELADO', label: 'Cancelado' },
      ]} />
  );
}