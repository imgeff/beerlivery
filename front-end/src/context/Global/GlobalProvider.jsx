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

function GlobalProvider({ children }) {
  const [user, setUser] = useState(defaultUser);

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
  }), [user]);

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
