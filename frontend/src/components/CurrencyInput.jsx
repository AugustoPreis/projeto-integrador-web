import { InputNumber } from 'antd';
import React from 'react';

export default function CurrencyInput(props) {

  return (
    <InputNumber {...props}
      style={{ width: '100%' }}
      min={0}
      prefix='R$'
      precision={2}
      controls={false}
      decimalSeparator=',' />
  );
}