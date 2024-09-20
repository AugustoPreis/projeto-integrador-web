import React from 'react';
import { Button, Card, Col, Popconfirm, Row } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Detalhes from './Detalhes';

export default function Item({ funcao, onDelete, fetch }) {

  return (
    <Card>
      <Row gutter={[10, 5]}
        align='middle'>
        <Col span={20}
          style={{ fontSize: 20 }}>
          {funcao.descricao}
        </Col>
        <Col span={4}>
          <Row gutter={[5, 5]}
            justify='end'>
            <Col>
              <Detalhes id={funcao.id}
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
      </Row>
    </Card>
  );
}