import React, { useState } from 'react';
import { Row, Modal, Form, Checkbox, Input, Col, Card } from 'antd';
import request from '../../utils/request';
import FuncaoSelect from '../funcao/Select';

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

    request('/funcionario/detalhes', {
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
      funcao: values.funcao?.id,
      id,
    }

    request('/funcionario/salvar', {
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
        title='Cadastro de Funcionário'
        okText='Salvar'
        centered
        width={750}
        destroyOnClose
        onCancel={handleClear}
        onOk={form.submit}
        okButtonProps={{ loading }}>
        <Form form={form}
          layout='vertical'
          onFinish={handleSubmit}>
          <Row gutter={[10, 5]}>
            <Col sm={14}
              xs={24}>
              <Form.Item name='nome'
                label='Nome'
                rules={[{ required: true, message: 'Campo obrigatório' }]}>
                <Input maxLength={150} />
              </Form.Item>
            </Col>
            <Col sm={10}
              xs={24}>
              <Form.Item name='funcao'
                label='Função'
                rules={[{ required: true, message: 'Campo obrigatório' }]}>
                <FuncaoSelect />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Card size='small'
                labe='Dados de Login'>
                <Row gutter={[10, 5]}>
                  <Col sm={13}
                    xs={24}>
                    <Form.Item name='login'
                      label='Login'
                      rules={[{ required: true, message: 'Campo obrigatório' }]}>
                      <Input maxLength={100} />
                    </Form.Item>
                  </Col>
                  <Col sm={11}
                    xs={24}>
                    <Form.Item name='senha'
                      label='Senha'
                      extra={id ? 'Informe caso queira alterar' : ''}
                      rules={[{ required: !id, message: 'Campo obrigatório' }]}>
                      <Input.Password />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name='adm'
                      valuePropName='checked'>
                      <Checkbox>
                        Administrador
                      </Checkbox>
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