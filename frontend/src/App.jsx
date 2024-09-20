import React, { lazy, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Card, Col, Divider, Row, Tag } from 'antd';
import Screen from './components/Screen';
import { useAuth } from './providers/AuthProvider';
import packageJson from '../package.json';

const Menu = lazy(() => import('./components/Menu'));

export default function App() {
  const auth = useAuth();
  const isAdmin = auth.isAdmin();

  if (!auth.user) {
    return null;
  }

  return (
    <Row>
      <Col xl={4}
        lg={5}
        xs={24}>
        <Menu />
      </Col>
      <Col xl={20}
        lg={19}
        xs={24}>
        <Screen>
          <Row gutter={[0, 10]}>
            <Col lg={24}
              xs={0}>
              <Card style={{ border: '1px solid #d9d9d9' }}>
                <Row justify='space-between'>
                  <Col xl={20}
                    lg={18}
                    style={{ fontSize: 20 }}>
                    Portal Startec
                  </Col>
                  <Col>
                    <Tag color={isAdmin ? 'green' : 'blue'}
                      style={{ fontSize: 14 }}>
                      {auth.user.nome}
                      {isAdmin ? ' (Administrador)' : ''}
                    </Tag>
                  </Col>
                  <Col span={24}>
                    <small>
                      Versão {packageJson.version}
                    </small>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Divider />
            <Col span={24}>
              <Outlet />
            </Col>
          </Row>
        </Screen>
      </Col>
    </Row>
  );
}