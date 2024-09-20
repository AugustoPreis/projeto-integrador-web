import React from 'react';
import { Button, Card, Col, Popconfirm, Row } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Detalhes from './Detalhes';
import ItemRender from '../../components/ItemRender';

export default function Item({ tipoServico, onDelete, fetch }) {

  const formatPagador = () => {
    switch (tipoServico.pagador) {
      case 'C':
        return 'Cliente';
      case 'E':
        return 'Empresa';
    }

    return '';
  }

  return (
    <Card>
      <Row gutter={[10, 5]}
        align='middle'>
        <Col span={20}>
          <Row gutter={[10, 5]}>
            <Col span={24}
              style={{ fontSize: 20 }}>
              {tipoServico.descricao}
            </Col>
            <Col span={24}>
              <ItemRender title='Pagador:'>
                {formatPagador()}
              </ItemRender>
            </Col>
          </Row>
        </Col>
        <Col span={4}>
          <Row gutter={[5, 5]}
            justify='end'>
            <Col>
              <Detalhes id={tipoServico.id}
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