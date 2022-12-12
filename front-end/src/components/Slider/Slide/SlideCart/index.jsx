import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { setItemLocalStorage } from '../../../../helpers/localStorage';
import cartIcon from '../../../../images/icons/cart.svg';
import emptyCartIlustration from '../../../../images/ilustrations/empty_cart.svg';
import './style.css';

function SlideCart({ cart: { customerCart, totalPrice, amountItems } }) {
  const history = useHistory();

  const redirectToCheckout = () => {
    setItemLocalStorage('carrinho', customerCart);
    history.push('/customer/checkout');
  };

  return (
    <div className="slide-cart">
      <div className="cart-items">
        { customerCart.length ? customerCart.map((itemCart) => (
          <span key={ itemCart.id }>
            <img src={ itemCart.urlImage } alt="Imagem do Item" />
            {itemCart.name}
            <span>{ itemCart.quantity }</span>
          </span>
        )) : (
          <img
            id="cart-empty-ilustration"
            src={ emptyCartIlustration }
            alt="Ilustração de um carrinho de compras vazio"
          />
        ) }
      </div>
      <div className="cart-footer">
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
        <button
          data-testid="customer_products__button-cart"
          type="button"
          onClick={ redirectToCheckout }
          disabled={ totalPrice <= 0 }
        >
          <img src={ cartIcon } alt="Ícone de um carrinho de compras" />
          Ver Carrinho
        </button>
      </div>
    </div>
  );
}

SlideCart.propTypes = {
  cart: PropTypes.shape({
    customerCart: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      urlImage: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })).isRequired,
    totalPrice: PropTypes.number.isRequired,
    amountItems: PropTypes.number.isRequired,
  }).isRequired,
};

export default SlideCart;
