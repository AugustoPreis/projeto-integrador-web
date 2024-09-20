import React from 'react';
import { Button, Col, Divider, Popconfirm, Row } from 'antd';
import { DeleteOutlined, EditOutlined, ToolOutlined } from '@ant-design/icons';
import Detalhes from './Detalhes';
import AlterarStatus from './AlterarStatus';

export default function Item({ servico, onDelete, fetch }) {

  const formatView = () => {
    const { numero, dataCadastro } = servico;
    let formatted = numero;

    if (dataCadastro) {
      formatted += `/${new Date(dataCadastro).getFullYear()}`;
    }

    return formatted;
  }

  return (
    <Row gutter={[10, 5]}>
      <Col span={20}>
        <div>
          <b style={{ fontSize: 18, opacity: 0.8 }}>
            {formatView()}
          </b>
        </div>
        <span style={{ opacity: 0.8 }}>
          {servico.descricao}
        </span>
      </Col>
      <Col span={4}>
        <Row gutter={[5, 5]}
          justify='end'>
          <Col>
            <AlterarStatus id={servico.id}
              onClose={fetch}>
              <Button icon={<ToolOutlined />} />
            </AlterarStatus>
          </Col>
          <Col>
            <Detalhes id={servico.id}
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