import React, { useState } from 'react';
import { Row, Modal, Form, Col, Input, Select } from 'antd';
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

    request('/tipo-servico/detalhes', {
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

    request('/tipo-servico/salvar', {
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
        title='Cadastro de Tipo de Serviço'
        okText='Salvar'
        centered
        width={550}
        destroyOnClose
        onCancel={handleClear}
        onOk={form.submit}
        okButtonProps={{ loading }}>
        <Form form={form}
          layout='vertical'
          onFinish={handleSubmit}
          initialValues={{ pagador: 'C' }}>
          <Row gutter={[10, 5]}>
            <Col span={24}>
              <Form.Item name='descricao'
                label='Descrição'
                rules={[{ required: true, message: 'Campo obrigatório' }]}>
                <Input maxLength={100} />
              </Form.Item>
            </Col>
            <Col sm={14}
              xs={24}>
              <Form.Item name='pagador'
                label='Pagador'
                rules={[{ required: true, message: 'Campo obrigatório' }]}>
                <Select style={{ width: '100%' }}
                  options={[
                    { value: 'C', label: 'Cliente' },
                    { value: 'E', label: 'Empresa' },
                  ]} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </span>
  );
}