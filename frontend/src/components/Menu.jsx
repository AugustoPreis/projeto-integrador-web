import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer, Menu as MenuAntd } from 'antd';
import { LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useAuth } from '../providers/AuthProvider';
import Screen from './Screen';

export default function Menu() {
  const [selectedKey, setSelectedKey] = useState('');
  const [visible, setVisible] = useState(false);
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
      type: 'group',
      children: [
        {
          key: 'funcoes',
          label: 'Funções',
        },
        {
          key: 'clientes',
          label: 'Clientes',
        },
        {
          key: 'funcionarios',
          label: 'Funcionários',
        },
        {
          key: 'tipos-servico',
          label: 'Tipos de Serviço',
        },
        {
          key: 'produtos',
          label: 'Produtos',
        },
        {
          key: 'servicos',
          label: 'Serviços',
        },
      ],
    },
    {
      key: 'sair',
      label: 'Sair',
      icon: <LogoutOutlined style={{ fontSize: 18 }} />,
      style: {
        color: 'red',
        position: 'absolute',
        bottom: '0',
        width: '100%',
        fontSize: 18,
      },
    },
  ];

  useEffect(() => {
    if (!selectedKey) {
      setSelectedKey(window.location.pathname.substring(1));
    }
  }, []);

  //remove os cadastros caso não seja admin
  if (!auth.isAdmin()) {
    itens.splice(1, 1);
  }

  const onSelect = (e) => {
    const { key } = e;

    if (key === 'sair') {
      return auth.logout();
    }

    setSelectedKey(key);
    navigate(key);
  }

  if (innerWidth < 992) {
    return (
      <Screen>
        <Button style={{ margin: '10px 0px' }}
          onClick={() => setVisible(!visible)}
          icon={visible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}>
          Menu
        </Button>
        <Drawer closable={false}
          onClose={() => setVisible(false)}
          width={300}
          open={visible}
          placement='left'
          styles={{
            body: {
              padding: 0,
              backgroundColor: '#edf5ef',
            },
          }}>
          <MenuAntd mode='vertical'
            items={itens}
            onSelect={onSelect}
            selectedKeys={[selectedKey]}
            style={{ backgroundColor: '#edf5ef', color: '#000' }} />
        </Drawer>
      </Screen>
    );
  }

  return (
    <MenuAntd items={itens}
      tabIndex={-1}
      mode='vertical'
      selectedKeys={[selectedKey]}
      onSelect={onSelect}
      style={{
        borderRadius: '10px',
        border: '1px solid #d9d9d9',
        height: 'calc(100vh - 16px)',
      }} />
  );
}