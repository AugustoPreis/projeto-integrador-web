import { useContext, createContext, useState } from 'react';
import request from '../utils/request';

const AuthContext = createContext();

const STORAGE_USER_KEY = 'user';

export default function AuthProvider(props) {
  const [user, setUser] = useState(() => {
    try {
      const user = localStorage.getItem(STORAGE_USER_KEY);

      if (user) {
        return JSON.parse(user);
      }

      return null;
    } catch {
      return null;
    }
  });

  const login = async (values) => {
    const { login, senha, tipo } = values;

    return new Promise((resolve, reject) => {
      request('/login', {
        method: 'POST',
        body: { login, senha, tipo },
      }).then((user) => {
        setUser(user);
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
        resolve(user);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_USER_KEY);
  }

  const isAuthenticated = () => {
    if (!user) {
      return false;
    }

    const { id, token } = user;

    if (typeof id != 'number' || id <= 0) {
      return false;
    }

    if (typeof token != 'string' || !token.trim().length) {
      return false;
    }

    return true;
  }

  const isAdmin = () => {
    if (!isAuthenticated()) {
      return false;
    }

    const { funcionario } = user;

    if (!funcionario) {
      return false;
    }

    return funcionario.adm || false;
  }

  const contextValue = {
    user,
    login,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return (
    <AuthContext.Provider {...props}
      value={contextValue} />
  );
}

export function useAuth() {
  return useContext(AuthContext);
}