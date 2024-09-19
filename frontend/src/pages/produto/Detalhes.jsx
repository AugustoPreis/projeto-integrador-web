import React, { useState } from 'react';
import { Row, Modal, Form, Col, Input, Card } from 'antd';
import CurrencyInput from '../../components/CurrencyInput';
import request from '../../utils/request';

export default function Detalhes({ id, children, onClose }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

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

    request('/produto/detalhes', {
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

    request('/produto/salvar', {
      method: id ? 'PUT' : 'POST',
      admin: true,
      body: { ...values, id },
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
        title='Cadastro de Produto'
        okText='Salvar'
        centered
        width={750}
        destroyOnClose
        onCancel={handleClear}
        onOk={form.submit}
        okButtonProps={{ loading }}>
        <Form form={form}
          layout='vertical'
          onFinish={handleSubmit}
          initialValues={{ inicioAcesso: new Date() }}>
          <Row gutter={[10, 5]}>
            <Col sm={16}
              xs={24}>
              <Form.Item name='nome'
                label='Nome'
                rules={[{ required: true, message: 'Campo obrigatório' }]}>
                <Input maxLength={150} />
              </Form.Item>
            </Col>
            <Col sm={8}
              xs={24}>
              <Form.Item name='valor'
                label='Valor'
                rules={[{ required: true, message: 'Campo obrigatório' }]}>
                <CurrencyInput />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name='descricao'
                label='Descrição'>
                <Input.TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </span>
  );
}