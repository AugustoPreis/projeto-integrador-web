import React, { useEffect, useState } from 'react';
import { Card, Modal, Spin } from 'antd';
import request from '../../utils/request';
import ItemSelecionado from './ItemSelecionado';
import Item from './Item';

export default function Cliente() {
  const [loading, setLoading] = useState(false);
  const [selecionado, setSelecionado] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    setLoading(true);

    request('/servico/listagem-cliente', {
      method: 'GET',
    }).then((data) => {
      setLoading(false);
      setSelecionado(0);
      setData(data);
    }).catch((err) => {
      setLoading(false);
      Modal.error({
        title: 'Erro!',
        content: err.message,
      });
    });
  }

  return (
    <Card style={{ marginTop: 10 }}>
      <Spin spinning={loading}>
        {data.map((item, index) => (
          <div key={index}
            style={{ cursor: 'pointer' }}
            onClick={() => setSelecionado(index)}>
            {selecionado === index ? (
              <ItemSelecionado id={item.id} />
            ) : (
              <Item data={item} />
            )}
          </div>
        ))}
      </Spin>
    </Card>
  );
}