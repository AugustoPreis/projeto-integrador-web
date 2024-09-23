import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Modal, Row, Spin } from 'antd';
import { ToolOutlined } from '@ant-design/icons';
import request from '../../utils/request';
import { getStatusStyle } from '../../utils/statusStyle';
import { formatCurrency } from '../../utils/currency';
import ItemRender from '../../components/ItemRender';
import AlterarStatus from '../servico/AlterarStatus';

export default function ItemSelecionado({ id }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const status = getStatusStyle(data.status);

  useEffect(() => {
    fetch();
  }, [id]);

  const fetch = () => {
    setLoading(true);

    request('/servico/detalhes', {
      method: 'GET',
      params: { id },
    }).then(({ status, ...data }) => {
      setLoading(false);
      setData({
        ...data,
        historico: status,
        status: status[0]?.status,
      });
    }).catch((err) => {
      setLoading(false);
      Modal.error({
        title: 'Erro!',
        content: err.message,
      });
    })
  }

  const formatNumero = () => {
    const { numero, dataCadastro } = data;

    if (!dataCadastro) {
      return numero;
    }

    return `${numero}/${new Date(dataCadastro).getFullYear()}`;
  }

  return (
    <Card style={{ marginBottom: 10 }}>
      <Spin spinning={loading}>
        <Row gutter={[10, 5]}
          justify={{ sm: 'start', xs: 'center' }}>
          <Col xl={10}
            lg={12}>
            <Row gutter={[10, 5]}>
              <Col span={24}
                style={{ fontSize: 25 }}>
                {formatNumero()}&nbsp;-&nbsp;
                <span style={{ color: status.color }}>
                  {status.label}
                </span>
              </Col>
              <Col span={24}>
                {data.descricao}
              </Col>
              <Col span={24}>
                <Row gutter={[50, 5]}>
                  <Col>
                    <ItemRender title='Valor'>
                      {formatCurrency(data.valor)}
                    </ItemRender>
                  </Col>
                  <Col>
                    <ItemRender title='Tipo de Serviço'>
                      {data.tipoServico?.descricao}
                    </ItemRender>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xl={12}
            lg={10}
            md={22}
            sm={21}
            xs={0}>
            {data.observacao?.trim() ? (
              <ItemRender title='Observação'>
                {data.observacao}
              </ItemRender>
            ) : null}
          </Col>
          <Col md={2}
            sm={3}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <AlterarStatus id={id}
              visualizar>
              <Button icon={<ToolOutlined />} />
            </AlterarStatus>
          </Col>
        </Row>
      </Spin>
    </Card>
  );
}