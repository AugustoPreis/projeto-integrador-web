import React, { useEffect, useState } from 'react';
import { Card, Col, Modal, Row, Table } from 'antd';
import { getStatusStyle } from '../../utils/statusStyle';
import { formatCurrency } from '../../utils/currency';
import request from '../../utils/request';

const initialState = {
  pagination: {
    current: 1,
    pageSize: 5,
  },
}

export default function Funcionario() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(initialState.pagination);
  const columns = [
    {
      title: 'Nº',
      key: 'numero',
      dataIndex: 'numero',
      width: 100,
      render: (_, row) => {
        const { numero, dataCadastro } = row;
        let formatted = numero;

        if (dataCadastro) {
          formatted += `/${new Date(dataCadastro).getFullYear()}`;
        }

        return formatted;
      },
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      width: 120,
      render: (value) => {
        const status = getStatusStyle(value);

        return (
          <span style={{ color: status.color }}>
            {status.label}
          </span>
        );
      },
    },
    {
      title: 'Cliente',
      key: 'cliente',
      dataIndex: 'cliente',
      render: (value) => value?.nome,
    },
    {
      title: 'Produto',
      key: 'produto',
      dataIndex: 'produto',
      render: (value) => value?.nome,
    },
    {
      title: 'Valor',
      key: 'valor',
      dataIndex: 'valor',
      width: 150,
      render: formatCurrency,
    },
  ];

  useEffect(() => {
    fetch();
  }, []);

  const fetch = (pag = initialState.pagination) => {
    setLoading(true);

    request('/servico/listagem-funcionario', {
      method: 'GET',
      params: { ...pag },
    }).then(({ data, total }) => {
      setLoading(false);
      setData(data);
      setPagination({ ...pag, total });
    }).catch((err) => {
      setLoading(false);
      Modal.error({
        title: 'Erro!',
        content: err.message,
      });
    });
  }

  return (
    <Card>
      <Row gutter={[10, 5]}>
        <Col span={24}
          style={{
            fontSize: 25,
            opacity: 0.9,
            textAlign: 'center',
            marginBottom: 30,
          }}>
          Últimas manutenções cadastradas
        </Col>
        <Col span={24}>
          <Table size='small'
            bordered
            loading={loading}
            columns={columns}
            rowKey='id'
            dataSource={data}
            scroll={{ x: 700 }}
            pagination={pagination}
            onChange={({ current, pageSize }) => fetch({ current, pageSize })} />
        </Col>
      </Row>
    </Card>
  );
}