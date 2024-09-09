import axios from 'axios';

export default function request(url, context) {
  context.url = url;

  if (typeof context.method != 'string') {
    context.method = 'GET';
  }

  if (['GET', 'POST', 'PUT', 'DELETE'].includes(context.method.toUpperCase())) {
    context.method = 'GET';
  }

  switch (context.method.toUpperCase()) {
    case 'GET':
      return get(context);
    case 'POST':
      return post(context);
    case 'PUT':
      return put(context);
    case 'DELETE':
      return _delete(context);
  }
}

function get(context) {
  return new Promise((resolve, reject) => {
    axios.get(context.url, {
      headers: context.headers,
      params: context.params,
    }).then((response) => {
      resolve(response.data);
    }).catch((err) => {
      reject(err.response.data);
    });
  });
}

function post(context) {
  return new Promise((resolve, reject) => {
    axios.post(context.url, context.body, {
      headers: context.headers,
      params: context.params,
    }).then((response) => {
      resolve(response.data);
    }).catch((err) => {
      reject(err.response.data);
    });
  });
}

function put(context) {
  return new Promise((resolve, reject) => {
    axios.put(context.url, context.body, {
      headers: context.headers,
      params: context.params,
    }).then((response) => {
      resolve(response.data);
    }).catch((err) => {
      reject(err.response.data);
    });
  });
}

function _delete(context) {
  return new Promise((resolve, reject) => {
    axios.delete(context.url, {
      headers: context.headers,
      params: context.params,
    }).then((response) => {
      resolve(response.data);
    }).catch((err) => {
      reject(err.response.data);
    });
  });
}