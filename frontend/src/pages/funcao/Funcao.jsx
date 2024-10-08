import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Input, message, Modal, Pagination, Row, Spin } from 'antd';
import { useTitle } from '../../hooks/useTitle';
import request from '../../utils/request';
import Detalhes from './Detalhes';
import Item from './Item';

const initialState = {
  pagination: {
    current: 1,
    pageSize: 5,
  },
}

export default function Funcao() {
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState({});
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(initialState.pagination);

  useTitle('Funções');

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch();
    }, 500);

    return () => clearTimeout(timeout);
  }, [filtro]);

  const fetch = (pag = initialState.pagination) => {
    setLoading(true);

    request('/funcao/listagem', {
      method: 'GET',
      admin: true,
      params: { ...filtro, ...pag },
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

    request('/funcao/deletar', {
      method: 'DELETE',
      admin: true,
      params: { id },
    }).then(() => {
      setLoading(false);
      message.success('Função excluida com sucesso!');
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
          <Col xl={6}
            lg={8}
            md={10}
            sm={14}
            xs={24}>
            <Input value={filtro.descricao}
              placeholder='Filtrar por descrição...'
              onChange={(e) => changeFiltro(e.target.value, 'descricao')} />
          </Col>
          <Col xl={{ span: 3, offset: 15 }}
            lg={{ span: 4, offset: 12 }}
            md={{ span: 6, offset: 8 }}
            sm={10}
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
                <Item funcao={item}
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