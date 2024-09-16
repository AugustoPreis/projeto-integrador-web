import React, { useState } from 'react';
import { Row, Modal, Form, Col, Input, Card } from 'antd';
import DatePicker from '../../components/DatePicker';
import PhoneInput from '../../components/PhoneInput';
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

    request('/cliente/detalhes', {
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

    request('/cliente/salvar', {
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
        title='Cadastro de Cliente'
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
            <Col md={12}
              xs={24}>
              <Form.Item name='nome'
                label='Nome'
                rules={[{ required: true, message: 'Campo obrigatório' }]}>
                <Input maxLength={150} />
              </Form.Item>
            </Col>
            <Col md={12}
              xs={24}>
              <Form.Item name='email'
                label='Email'>
                <Input maxLength={100} />
              </Form.Item>
            </Col>
            <Col md={8}
              sm={12}
              xs={24}>
              <Form.Item name='telefone'
                label='Telefone'>
                <PhoneInput />
              </Form.Item>
            </Col>
            <Col span={24}
              style={{ marginTop: 15 }}>
              <Card size='small'
                title='Dados de Login'>
                <Row gutter={[10, 5]}>
                  <Col sm={14}
                    xs={24}>
                    <Form.Item name='login'
                      label='Login'
                      rules={[{ required: true, message: 'Campo obrigatório' }]}>
                      <Input maxLength={100} />
                    </Form.Item>
                  </Col>
                  <Col sm={10}
                    xs={24}>
                    <Form.Item name='senha'
                      label='Senha'
                      extra={id ? 'Informe caso queira alterar' : ''}
                      rules={[{ required: !id, message: 'Campo obrigatório' }]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col md={8}
                    sm={12}
                    xs={12}>
                    <Form.Item name='inicioAcesso'
                      label='Início Acesso'
                      rules={[{ required: true, message: 'Campo obrigatório' }]}>
                      <DatePicker format='dd/MM/yyyy'
                        style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col md={8}
                    sm={12}
                    xs={12}>
                    <Form.Item name='fimAcesso'
                      label='Fim Acesso'>
                      <DatePicker format='dd/MM/yyyy'
                        style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      </Modal>
    </span>
  );
}