import React from 'react';
import { Button, Card, Col, Popconfirm, Row, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, ToolOutlined } from '@ant-design/icons';
import Detalhes from './Detalhes';
import AlterarStatus from './AlterarStatus';
import ItemRender from '../../components/ItemRender';
import { getStatusStyle } from '../../utils/statusStyle';

export default function Item({ servico, onDelete, fetch }) {
  const status = getStatusStyle(servico.status);

  const formatNumero = () => {
    const { numero, dataCadastro } = servico;
    let formatted = numero;

    if (dataCadastro) {
      formatted += `/${new Date(dataCadastro).getFullYear()}`;
    }

    return formatted;
  }

  return (
    <Card>
      <Row gutter={[10, 5]}
        align='middle'>
        <Col span={20}>
          <Row gutter={[10, 5]}>
            <Col span={24}>
              <Row gutter={5}>
                <Col style={{ fontSize: 20 }}>
                  {formatNumero()} -
                </Col>
                <Col style={{ color: status.color, fontSize: 20 }}>
                  {status.label}
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              {servico.descricao}
            </Col>
            <Col>
              <ItemRender title='Cliente'>
                {servico.cliente?.nome}
              </ItemRender>
            </Col>
            <Col style={{ marginLeft: 20 }}>
              <ItemRender title='Produto'>
                {servico.produto?.nome}
              </ItemRender>
            </Col>
          </Row>
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
      </Row>
    </Card>
  );
}