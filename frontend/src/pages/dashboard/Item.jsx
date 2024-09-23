import React from 'react';
import { Card, Col, Row } from 'antd';
import { getStatusStyle } from '../../utils/statusStyle';

export default function Item({ data }) {
  const { numero, dataCadastro, descricao } = data;
  const status = getStatusStyle(data.status);

  return (
    <Card style={{ marginBottom: 10 }}>
      <Row gutter={[10, 5]}>
        <Col span={24}
          style={{ fontSize: 18 }}>
          {numero}/{new Date(dataCadastro).getFullYear()}&nbsp;-&nbsp;
          <span style={{ color: status.color }}>
            {status.label}
          </span>
        </Col>
        <Col span={24}>
          {descricao}
        </Col>
      </Row>
    </Card>
  );
}