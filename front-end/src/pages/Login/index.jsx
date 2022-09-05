import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getItemLocalStorage, setItemLocalStorage } from '../../helpers/localStorage';
import { fetchPost } from '../../helpers/api/requests';
import validateDataUser from '../../helpers/validate/validateDataUser';
import registerIcon from '../../images/icons/register.svg';
import loginIcon from '../../images/icons/login.svg';
import cloudsIlustration from '../../images/ilustrations/clouds.svg';
import beerIcon from '../../images/icons/beer-icon.png';
import './style.css';

function LoginPage() {
  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [messageError, setMessageError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const history = useHistory();
  const pathname = history.location.pathname.replace('/', '');

  const validateUser = () => {
    if (isRegister) {
      setButtonDisabled(!validateDataUser(dataUser, true));
    } else {
      const dataLogin = { email: dataUser.email, password: dataUser.password };
      setButtonDisabled(!validateDataUser(dataLogin));
    }
  };

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
    validateUser();
  }, [dataUser]);

  const handleChange = ({ target: { name, value } }) => {
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const postLogin = async () => {
    const dataLogin = { email: dataUser.email, password: dataUser.password };
    const response = isRegister ? await fetchPost(dataUser, 'register') : (
      await fetchPost(dataLogin, 'login'));

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
      <div className="container-form">
        <div className="presentation">
          <h1>
            <img src={ beerIcon } alt="Icone de uma garrafa de cerveja" />
            Devlivery
          </h1>
          <p>Seja Bem Vindo! Faça seu login na plataforma</p>
        </div>
        <div className="select-form">
          <button type="button" onClick={ () => setIsRegister(false) }>
            <img src={ loginIcon } alt="ícone de login" />
            <span>Entrar</span>
          </button>
          <button type="button" onClick={ () => setIsRegister(true) }>
            <img src={ registerIcon } alt="ícone de registro" />
            <span>Registrar</span>
          </button>
        </div>
        <form>
          { isRegister && (
            <label htmlFor="input-name">
              Nome
              <input
                data-testid="common_register__input-name"
                type="text"
                name="name"
                placeholder="Seu nome"
                value={ dataUser.name }
                onChange={ handleChange }
              />
            </label>
          )}
          <label htmlFor="email">
            Email
            <input
              id="email"
              type="text"
              name="email"
              spellCheck="false"
              placeholder=" email@email.com"
              value={ dataUser.email }
              data-testid={ `common_${pathname}__input-email` }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              id="password"
              type="password"
              placeholder=" * * * * * *"
              data-testid={ `common_${pathname}__input-password` }
              name="password"
              value={ dataUser.password }
              onChange={ handleChange }
            />
          </label>
          <button
            className="btn-primary"
            type="button"
            data-testid={ `common_${pathname}__button-${pathname}` }
            disabled={ buttonDisabled }
            onClick={ postLogin }
            style={ { cursor: buttonDisabled ? 'not-allowed' : 'pointer' } }
          >
            { isRegister ? 'registrar' : 'entrar' }
          </button>
          <span
            data-testid={ pathname === 'login' ? 'common_login__element-invalid-email' : (
              'common_register__element-invalid-register') }
            style={ messageError.length > 0 ? { opacity: 1 } : { opacity: 0 } }
          >
            {messageError}
          </span>
        </form>
      </div>
      <div className="login-branding">
        <img src={ cloudsIlustration } alt="ilustração de nuvens" />
      </div>
    </div>
  );
}

export default LoginPage;
