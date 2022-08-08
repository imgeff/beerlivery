import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { getItemLocalStorage, setItemLocalStorage } from '../../helpers/localStorage';
import {
  validateEmailAndPassword } from '../../helpers/validate/validateEmailAndPassword';
import { fetchPost } from '../../helpers/api/requests';
import deliveryBackground from '../../images/TakeAway-pana.svg';
import './style.css';

function LoginPage() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [messageError, setMessageError] = useState('');

  const history = useHistory();

  const isUserLogged = () => {
    const findUser = getItemLocalStorage('user');

    if (findUser) {
      const { role } = findUser;
      if (role === 'administrator') {
        history.push('/admin/manage');
      }
      if (role === 'seller') {
        history.push('/seller/orders');
      }
      if (role === 'customer') {
        history.push('/customer/products');
      }
    }
  };

  // componentDidMount
  useEffect(() => {
    isUserLogged();
  }, []);

  // componentDidUpdate
  useEffect(() => {
    setButtonDisabled(validateEmailAndPassword(login.email, login.password));
  }, [login]);

  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const postLogin = async () => {
    const response = await fetchPost(login, 'login');

    if (response.message) {
      setMessageError(response.message);
    }

    setItemLocalStorage('user', response);

    if (response.role === 'administrator') {
      history.push('/admin/manage');
    }
    if (response.role === 'seller') {
      history.push('/seller/orders');
    }
    if (response.role === 'customer') {
      history.push('/customer/products');
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <form>
          <label htmlFor="email">
            Email
            <input
              id="email"
              type="text"
              name="email"
              placeholder=" email@email.com"
              value={ login.email }
              data-testid="common_login__input-email"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              id="password"
              type="password"
              placeholder=" * * * * * *"
              data-testid="common_login__input-password"
              name="password"
              value={ login.password }
              onChange={ handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="common_login__button-login"
            disabled={ buttonDisabled }
            onClick={ postLogin }
          >
            login
          </button>
          <div>
            <Link
              to="/register"
              type="button"
              data-testid="common_login__button-register"
            >
              Ainda não tenho conta
            </Link>
          </div>
          <span
            data-testid="common_login__element-invalid-email"
            style={ messageError.length > 0 ? { opacity: 1 } : { opacity: 0 } }
          >
            {messageError}
          </span>
        </form>
      </div>
      <div className="login-background">
        <h1>Delivery App</h1>
        <figure>
          <img src={ deliveryBackground } alt="" />
        </figure>
      </div>
    </div>
  );
}

export default LoginPage;
