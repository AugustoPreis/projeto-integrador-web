import React, { useState } from 'react';
import { Row, Modal, Form, Col, Input } from 'antd';
import request from '../../utils/request';
import CurrencyInput from '../../components/CurrencyInput';
import ClienteSelect from '../cliente/Select';
import ProdutoSelect from '../produto/Select';
import TipoServicoSelect from '../tipoServico/Select';
import FuncionarioSelect from '../funcionario/Select';

export default function Detalhes({ id, children, onClose }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const editing = !!id;

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

    setLoading(true);

    request('/servico/detalhes', {
      method: 'GET',
      admin: true,
      params: { id },
    }).then((data) => {
      setLoading(false);
      form.setFieldsValue(data);
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
      id,
      cliente: values.cliente?.id,
      produto: values.produto?.id,
      tipoServico: values.tipoServico?.id,
      funcionario: values.funcionario?.id,
    }

    request('/servico/salvar', {
      method: id ? 'PUT' : 'POST',
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
        title='Cadastro de Serviço'
        okText='Salvar'
        centered
        width={1000}
        destroyOnClose
        onCancel={handleClear}
        onOk={form.submit}
        okButtonProps={{ loading }}>
        <Form form={form}
          layout='vertical'
          onFinish={handleSubmit}>
          <Row gutter={[10, 5]}>
            <Col md={14}
              xs={24}>
              <Form.Item name='descricao'
                label='Descrição'
                rules={[{ required: true, message: 'Campo obrigatório' }]}>
                <Input maxLength={150} />
              </Form.Item>
            </Col>
            <Col md={10}
              sm={14}
              xs={24}>
              <Form.Item name='tipoServico'
                label='Tipo de Serviço'
                rules={[{ required: !editing, message: 'Campo obrigatório' }]}>
                <TipoServicoSelect disabled={editing} />
              </Form.Item>
            </Col>
            <Col md={4}
              sm={10}
              xs={24}>
              <Form.Item name='valor'
                label='Valor'>
                <CurrencyInput />
              </Form.Item>
            </Col>
            <Col md={10}
              sm={12}
              xs={24}>
              <Form.Item name='cliente'
                label='Cliente'
                rules={[{ required: !editing, message: 'Campo obrigatório' }]}>
                <ClienteSelect disabled={editing} />
              </Form.Item>
            </Col>
            <Col md={10}
              sm={12}
              xs={24}>
              <Form.Item name='produto'
                label='Produto'
                rules={[{ required: !editing, message: 'Campo obrigatório' }]}>
                <ProdutoSelect disabled={editing} />
              </Form.Item>
            </Col>
            {!editing ? (
              <Col md={10}
                xs={24}>
                <Form.Item name='funcionario'
                  label='Funcionário Responsável'
                  rules={[{ required: !editing, message: 'Campo obrigatório' }]}>
                  <FuncionarioSelect />
                </Form.Item>
              </Col>
            ) : null}
            <Col span={24}>
              <Form.Item name='observacao'
                label='Observações'>
                <Input.TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </span>
  );
}