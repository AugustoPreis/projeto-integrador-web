import React, { useEffect, useState } from 'react';
import { Button, Card, Col, InputNumber, message, Modal, Pagination, Row, Spin } from 'antd';
import { useTitle } from '../../hooks/useTitle';
import request from '../../utils/request';
import ClienteSelect from '../cliente/Select';
import ProdutoSelect from '../produto/Select';
import TipoServicoSelect from '../tipoServico/Select';
import Detalhes from './Detalhes';
import Item from './Item';

const initialState = {
  pagination: {
    current: 1,
    pageSize: 5,
  },
}

export default function Servico() {
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState({});
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(initialState.pagination);

  useTitle('Serviços');

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch();
    }, 500);

    return () => clearTimeout(timeout);
  }, [filtro]);

  const fetch = (pag = initialState.pagination) => {
    setLoading(true);

    const params = {
      ...filtro,
      ...pag,
      cliente: filtro.cliente?.id,
      produto: filtro.produto?.id,
      tipoServico: filtro.tipoServico?.id,
    }

    request('/servico/listagem', {
      method: 'GET',
      params,
    }).then(({ total, data }) => {
      setLoading(false);
      setData(data);
      setPagination({ ...pag, total });
    }).catch((err) => {
      setLoading(false);
      Modal.error({
        title: 'Erro!',
        content: err.message,
      });
    })
  }

  const handleDelete = (id) => {
    setLoading(true);

    request('/servico/inativar', {
      method: 'PUT',
      body: { id },
    }).then(() => {
      setLoading(false);
      message.success('Serviço inativado com sucesso!');
      fetch();
    }).catch((err) => {
      setLoading(false);
      Modal.error({
        title: 'Erro!',
        content: err.message,
      });
    });
  }

  const changeFiltro = (value, key) => {
    setFiltro({ ...filtro, [key]: value });
  }

  return (
    <React.Fragment>
      <Card>
        <Row gutter={[10, 5]}>
          <Col xl={3}
            lg={4}
            md={6}
            sm={8}
            xs={24}>
            <InputNumber min={0}
              value={filtro.numero}
              style={{ width: '100%' }}
              precision={0}
              controls={false}
              placeholder='Filtrar por Nº...'
              onChange={(value) => changeFiltro(value, 'numero')} />
          </Col>
          <Col xl={6}
            lg={10}
            md={9}
            sm={16}
            xs={24}>
            <ClienteSelect value={filtro.cliente}
              placeholder='Filtrar por Cliente...'
              onChange={(value) => changeFiltro(value, 'cliente')} />
          </Col>
          <Col xl={6}
            lg={10}
            md={9}
            sm={12}
            xs={24}>
            <ProdutoSelect value={filtro.produto}
              placeholder='Filtrar por Produto...'
              onChange={(value) => changeFiltro(value, 'produto')} />
          </Col>
          <Col xl={6}
            lg={8}
            md={10}
            sm={12}
            xs={24}>
            <TipoServicoSelect value={filtro.tipoServico}
              placeholder='Filtrar por Tipo de Serviço...'
              onChange={(value) => changeFiltro(value, 'tipoServico')} />
          </Col>
          <Col xl={{ span: 3, offset: 0 }}
            lg={{ span: 7, offset: 9 }}
            md={{ span: 6, offset: 8 }}
            xs={24}>
            <Detalhes onClose={fetch}>
              <Button block
                type='primary'>
                Cadastrar
              </Button>
            </Detalhes>
          </Col>
        </Row>
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Spin spinning={loading}>
          <Row gutter={[10, 5]}
            justify='end'>
            {data.map((item, i) => (
              <Col key={i}
                span={24}>
                <Item servico={item}
                  fetch={() => fetch(pagination)}
                  onDelete={() => handleDelete(item.id)} />
              </Col>
            ))}
            <Col>
              <Pagination {...pagination}
                onChange={(current, pageSize) => fetch({ current, pageSize })} />
            </Col>
          </Row>
        </Spin>
      </Card>
    </React.Fragment>
  );
}