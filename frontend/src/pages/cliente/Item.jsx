import React from 'react';
import { format } from 'date-fns';
import { Button, Col, Card, Popconfirm, Row } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ItemRender from '../../components/ItemRender';
import Detalhes from './Detalhes';

export default function Item({ cliente, onDelete, fetch }) {

  return (
    <Card>
      <Row gutter={[10, 5]}
        align='middle'>
        <Col span={20}>
          <Row gutter={[10, 5]}>
            <Col span={24}
              style={{ fontSize: 20 }}>
              {cliente.nome}
            </Col>
            <Col>
              <ItemRender title='Início Acesso:'>
                {format(new Date(cliente.inicioAcesso), 'dd/MM/yyyy')}
              </ItemRender>
            </Col>
            {cliente.fimAcesso ? (
              <Col style={{ marginLeft: 20 }}>
                <ItemRender title='Fim Acesso:'>
                  {format(new Date(cliente.inicioAcesso), 'dd/MM/yyyy')}
                </ItemRender>
              </Col>
            ) : null}
          </Row>
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
      </Row>
    </Card>
  );
}