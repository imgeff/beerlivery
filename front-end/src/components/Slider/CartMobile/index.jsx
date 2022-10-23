import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { setItemLocalStorage } from '../../../helpers/localStorage';
import cartIcon from '../../../images/icons/cart.svg';
import './style.css';

function CartMobile({ cart: { totalPrice, amountItems } }) {
  const history = useHistory();

  const redirectToCheckout = () => {
    setItemLocalStorage('carrinho', customerCart);
    history.push('/customer/checkout');
  };

  return (
    <>
        <button
          className='cart-mobile'
          data-testid="customer_products__button-cart"
          type="button"
          onClick={ redirectToCheckout }
          disabled={ totalPrice <= 0 }
        >
          <img src={ cartIcon } alt="Ícone de um carrinho de compras" />
          <span id="price-cart">
            Preço Total:
            <span data-testid="customer_products__checkout-bottom-value">
              {' '}
              R$
              {' '}
              { totalPrice.toFixed(2).replace('.', ',') }
            </span>
          </span>
          <span id="quantity-cart">
            Quantidade:
            {' '}
            <span>{amountItems}</span>
          </span>
        </button>
    </>
  );
}

CartMobile.propTypes = {
  cart: PropTypes.shape({
    totalPrice: PropTypes.number.isRequired,
    amountItems: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartMobile;
