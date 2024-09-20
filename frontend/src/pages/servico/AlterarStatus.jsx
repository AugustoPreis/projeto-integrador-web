import React, { useState } from 'react';
import { format } from 'date-fns';
import { Row, Modal, Form, Col, Table, Divider } from 'antd';
import request from '../../utils/request';
import FuncionarioSelect from '../funcionario/Select';
import StatusServicoSelect from '../statusServico/Select';
import { getStatusStyle } from '../../utils/statusStyle';

export default function AlterarStatus({ id, children, onClose }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [form] = Form.useForm();
  const columns = [
    {
      title: 'Funcionário',
      key: 'funcionario',
      dataIndex: 'funcionario',
      render: (value) => value?.nome,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      width: 120,
      render: (value) => {
        const { color, label } = getStatusStyle(value);

        return (
          <div style={{ color }}>
            {label}
          </div>
        )
      }
    },
    {
      title: 'Data',
      key: 'dataCadastro',
      dataIndex: 'dataCadastro',
      width: 150,
      render: (value) => value ? format(new Date(value), 'dd/MM/yyyy HH:mm') : '',
    }
  ];

  const modal = (e) => {
    e.stopPropagation();
    setVisible(true);

    if (id) {
      fetch();
    }
  }

  const fetch = () => {
    if (!id) {
      return;
    }

    setLoading(false);

    request('/servico-funcionario/historico', {
      method: 'GET',
      admin: true,
      params: { servico: id },
    }).then((data) => {
      setLoading(false);
      form.setFieldsValue(data[0]);
      setHistorico(data);
    }).catch((err) => {
      setLoading(false);
      Modal.error({
        title: 'Erro!',
        content: err.message,
      });
    });
  }

  const handleSubmit = (values) => {
    setLoading(true);

    const body = {
      ...values,
      servico: id,
      funcionario: values.funcionario?.id,
    }

    request('/servico-funcionario/alterar-status', {
      method: 'POST',
      admin: true,
      body,
    }).then(() => {
      setLoading(false);
      handleClear();
      onClose?.();
    }).catch((err) => {
      setLoading(false);
      Modal.error({
        title: 'Erro!',
        content: err.message,
      });
    });
  }

  const handleClear = () => {
    form.resetFields();
    setLoading(false);
    setVisible(false);
  }

  return (
    <span>
      <span onClick={modal}
        style={{ cursor: 'pointer' }}>
        {children}
      </span>
      <Modal open={visible}
        title='Status do Serviço'
        okText='Salvar'
        centered
        width={650}
        destroyOnClose
        onCancel={handleClear}
        onOk={form.submit}
        okButtonProps={{ loading }}>
        <Form form={form}
          layout='vertical'
          onFinish={handleSubmit}>
          <Row gutter={[10, 5]}>
            <Col sm={16}
              xs={24}>
              <Form.Item name='funcionario'
                label='Funcionário'
                rules={[{ required: true, message: 'Campo obrigatório' }]}>
                <FuncionarioSelect />
              </Form.Item>
            </Col>
            <Col sm={8}
              xs={24}>
              <Form.Item name='status'
                label='Status'
                rules={[{ required: true, message: 'Campo obrigatório' }]}>
                <StatusServicoSelect />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Divider style={{ margin: '0px 0px' }} />
              <div style={{
                fontSize: 20,
                fontWeight: 'bold',
                opacity: 0.85,
                margin: '20px 0px',
                textAlign: 'center',
              }}>
                Histórico do Serviço
              </div>
              <Table size='small'
                columns={columns}
                rowKey='id'
                dataSource={historico}
                pagination={false}
                scroll={{ x: 450, y: 400 }} />
            </Col>
          </Row>
        </Form>
      </Modal>
    </span>
  );
}