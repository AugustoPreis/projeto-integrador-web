import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Input, message, Modal, Pagination, Row, Spin } from 'antd';
import request from '../../utils/request';
import Detalhes from './Detalhes';
import Item from './Item';
import FuncaoSelect from '../funcao/Select';

const initialState = {
  pagination: {
    current: 1,
    pageSize: 5,
  },
}

export default function Funcionario() {
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState({});
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(initialState.pagination);

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
      funcao: filtro.funcao?.id,
    }

    request('/funcionario/listagem', {
      method: 'GET',
      admin: true,
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

    request('/funcionario/inativar', {
      method: 'PUT',
      admin: true,
      body: { id },
    }).then(() => {
      setLoading(false);
      message.success('Funcionário excluido com sucesso!');
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
            <Input value={filtro.nome}
              placeholder='Filtrar por nome...'
              onChange={(e) => changeFiltro(e.target.value, 'nome')} />
          </Col>
          <Col xl={5}
            lg={7}
            md={8}
            sm={10}
            xs={24}>
            <FuncaoSelect value={filtro.funcao}
              placeholder='Filtrar por função...'
              onChange={(value) => changeFiltro(value, 'funcao')} />
          </Col>
          <Col xl={{ span: 3, offset: 10 }}
            lg={{ span: 4, offset: 5 }}
            md={6}
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
                <Item funcionario={item}
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