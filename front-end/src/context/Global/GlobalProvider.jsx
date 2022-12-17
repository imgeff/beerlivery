import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';
import { getItemLocalStorage } from '../../helpers/localStorage';

const defaultUser = {
  name: '',
  email: '',
  role: '',
  token: '',
};

const indicatorColors = {
  Pendente: '#c49a6c',
  Preparando: '#87D53C',
  Entregue: '#2FC18C',
};

function GlobalProvider({ children }) {
  const [user, setUser] = useState(defaultUser);

  const [messageError, setMessageError] = useState('');

  const catchDataUser = () => {
    const data = getItemLocalStorage('user');
    setUser(data);
  };

  useEffect(() => {
    catchDataUser();
  }, []);

  const contextValue = useMemo(() => ({
    userData: {
      user,
      setUser,
    },
    api: {
      setMessageError,
      messageError,
    },
    style: {
      indicatorColors,
    },
  }), [user, messageError]);

  return (
    <GlobalContext.Provider value={ contextValue }>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
