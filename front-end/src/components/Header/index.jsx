import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { removeItemLocalStorage } from '../../helpers/localStorage';
import beerIcon from '../../images/icons/beer-icon.png';
import './style.css';
import setActiveElement from '../../helpers/dom/setActiveElement';

function Header({ buttonOne, buttonTwo, role, testId, routeOne, routeTwo }) {
  const history = useHistory();
  const redirectToOrders = () => {
    history.push(routeTwo);
    setActiveElement('active-quaternary', '#button-two', true);
  };

  const redirectToProducts = () => {
    history.push(routeOne);
    setActiveElement('active-quaternary', '#button-one', true);
  };

  return (
    <header className="header" data-testid={ testId }>
      <span
        className="greeting"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        <img src={ beerIcon } alt="Ícone de uma caneca de cerveja" />
        Devlivery
      </span>
      <nav>
        <button
          id="button-one"
          className={
            history.location.pathname.includes('products') ? 'active-quaternary' : null
          }
          type="button"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ redirectToProducts }
        >
          { buttonOne }
        </button>

        {
          role === 'customer' && (
            <button
              className={
                history.location.pathname.includes('orders') ? 'active-quaternary' : null
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
  role: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  routeOne: PropTypes.string.isRequired,
  routeTwo: PropTypes.string.isRequired,
};

export default Header;
