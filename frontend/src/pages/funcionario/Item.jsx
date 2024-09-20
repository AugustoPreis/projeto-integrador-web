import React from 'react';
import { Button, Card, Col, Popconfirm, Row } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ItemRender from '../../components/ItemRender';
import Detalhes from './Detalhes';

export default function Item({ funcionario, onDelete, fetch }) {

  return (
    <Card>
      <Row gutter={[10, 5]}
        align='middle'>
        <Col span={20}>
          <Row gutter={[10, 5]}>
            <Col span={24}
              style={{ fontSize: 20 }}>
              {funcionario.nome}{funcionario.adm ? ' - Administrador' : ''}
            </Col>
            <Col>
              <ItemRender title='Função:'>
                {funcionario.funcao?.descricao}
              </ItemRender>
            </Col>
          </Row>
        </Col>
        <Col span={4}>
          <Row gutter={[5, 5]}
            justify='end'>
            <Col>
              <Detalhes id={funcionario.id}
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