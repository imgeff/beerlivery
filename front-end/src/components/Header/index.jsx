import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { removeItemLocalStorage } from '../../helpers/localStorage';
import beerIcon from '../../images/icons/beer-icon.png';
import setActiveElement from '../../helpers/dom/setActiveElement';
import logoutIcon from '../../images/icons/log-out.svg';
import './style.css';
import GlobalContext from '../../context/Global/GlobalContext';

const classActiveQuaternary = 'active-header-quaternary';

function Header({ buttonOne, buttonTwo, testId, routeOne, routeTwo }) {
  const { userData: { user } } = useContext(GlobalContext);

  const history = useHistory();

  const { pathname } = history.location;

  const redirectToOrders = () => {
    history.push(routeTwo);
    setActiveElement(classActiveQuaternary, '#button-two', true);
  };

  const redirectToProducts = () => {
    history.push(routeOne);
    setActiveElement(classActiveQuaternary, '#button-one', true);
  };

  return (
    <header className="header" data-testid={ testId }>
      <span
        className="greeting"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        <img src={ beerIcon } alt="Ícone de uma caneca de cerveja" />
        <span>Devlivery</span>
      </span>
      <nav>
        <button
          id="button-one"
          className={
            pathname.includes('products') ? classActiveQuaternary : null
          }
          type="button"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ redirectToProducts }
        >
          { buttonOne }
        </button>

        {
          user.role === 'customer' && (
            <button
              className={
                pathname.includes('orders') ? classActiveQuaternary : null
              }
              type="button"
              data-testid="customer_products__element-navbar-link-orders"
              onClick={ redirectToOrders }
            >
              { buttonTwo }
            </button>
          )
        }
      </nav>
      <Link
        to="/login"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => removeItemLocalStorage('user') }
      >
        <img src={ logoutIcon } alt="Ícone de Logout" />
        Sair
      </Link>
    </header>
  );
}

Header.defaultProps = {
  buttonTwo: '',
};

Header.propTypes = {
  buttonOne: PropTypes.string.isRequired,
  buttonTwo: PropTypes.string,
  testId: PropTypes.string.isRequired,
  routeOne: PropTypes.string.isRequired,
  routeTwo: PropTypes.string.isRequired,
};

export default Header;
