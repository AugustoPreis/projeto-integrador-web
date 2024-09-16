import React from 'react';
import { Button, Col, Divider, Popconfirm, Row } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Detalhes from './Detalhes';

export default function Item({ cliente, onDelete, fetch }) {

  return (
    <Row gutter={[10, 5]}>
      <Col span={20}>
        <b style={{ fontSize: 18, opacity: 0.8 }}>
          {cliente.nome}
        </b>
      </Col>
      <Col span={4}>
        <Row gutter={[5, 5]}
          justify='end'>
          <Col>
            <Detalhes id={cliente.id}
              onClose={fetch}>
              <Button icon={<EditOutlined />} />
            </Detalhes>
          </Col>
          <Col>
            <Popconfirm title='Deseja excluir?'
              onConfirm={onDelete}>
              <Button danger
                icon={<DeleteOutlined />} />
            </Popconfirm>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Divider style={{ margin: '20px 0px' }} />
      </Col>
    </Row>
  );
}