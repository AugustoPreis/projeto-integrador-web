import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Menu as MenuAntd } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../providers/AuthProvider';

function Menu() {
  const [selectedKey, setSelectedKey] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();
  const itens = [
    {
      key: 'dashboard',
      label: 'Dashboard',
    },
    {
      key: 'cadastros',
      label: 'Cadastros',
      children: [],
    },
    {
      key: 'sair',
      label: 'Sair',
      icon: <LogoutOutlined />,
      style: {
        marginLeft: 'auto',
        color: 'red',
      },
    },
  ];

  const onSelect = (e) => {
    const { key } = e;

    if (key === 'sair') {
      return auth.logout();
    }

    setSelectedKey(key);
    navigate(key);
  }

  return (
    <Row>
      <Col span={24}>
        <MenuAntd items={itens}
          mode='horizontal'
          subMenuCloseDelay={0.3}
          selectedKeys={[selectedKey]}
          onSelect={onSelect}
          tabIndex={-1}
          style={{ borderRadius: '10px' }} />
      </Col>
    </Row>
  );
}

export default Menu;