import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { setItemLocalStorage } from '../../helpers/localStorage';
import nextIcon from '../../images/icons/chevron-right.svg';
import prevIcon from '../../images/icons/chevron-left.svg';
import cartIcon from '../../images/icons/cart.svg';
import emptyCartIlustration from '../../images/ilustrations/empty_cart.svg';
import './style.css';

function Slide({
  price,
  image,
  name,
  id,
  index,
  setCustomerCart,
  customerCart,
  totalPrice,
  amountItems,
  slideActive,
  scrollToElement,
  start,
  end,
}) {
  const itemIsInCard = customerCart.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(itemIsInCard ? itemIsInCard.quantity : 0);

  const history = useHistory();

  const redirectToCheckout = () => {
    setItemLocalStorage('carrinho', customerCart);
    history.push('/customer/checkout');
  };

  const changeCart = () => {
    const ONELESS = -1;
    const cart = [...customerCart];
    const indexOfItem = customerCart.findIndex((itemCart) => itemCart.id === id);
    const itemCard = {
      id,
      name,
      image,
      price,
      quantity,
      subTotal: quantity * parseFloat(price),
    };

    if (indexOfItem === ONELESS) {
      cart.push(itemCard);
    } else {
      cart[indexOfItem] = itemCard;
    }
    if (itemCard.quantity === 0) {
      cart.splice(indexOfItem, 1);
    }
    setCustomerCart(cart);
  };

  const updateItem = ({ target }) => {
    const targetToNumber = !target.value ? 0 : parseFloat(target.value);
    setQuantity(targetToNumber);
  };

  useEffect(() => {
    changeCart();
  }, [quantity]);

  return (
    <div key={ id } className={ index === 0 ? 'slide first' : 'slide' }>
      <figure>
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ image }
          alt={ name }
          className="productImage"
        />
      </figure>
      <div className="slide-iteractive">
        <div className="slide-info">
          <span data-testid={ `customer_products__element-card-title-${id}` }>
            {' '}
            {name}
            {' '}
          </span>
          <span data-testid={ `customer_products__element-card-price-${id}` }>
            {`R$ ${price.replace('.', ',')}`}
          </span>
        </div>
        <div className="slide-buttons">
          <button
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            onClick={ () => setQuantity(quantity - 1) }
            disabled={ !quantity }
            title="Retirar Produto"
          >
            -
          </button>

          <input
            data-testid={ `customer_products__input-card-quantity-${id}` }
            type="text"
            value={ quantity }
            onChange={ updateItem }
          />

          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            onClick={ () => setQuantity(quantity + 1) }
            title="Adicionar Produto"
          >
            +
          </button>
        </div>
        <div className="slider-navigators">
          <button
            title="Anterior"
            type="button"
            onClick={ () => {
              scrollToElement(slideActive > start ? slideActive - 1 : (
                slideActive));
            } }
          >
            <img src={ prevIcon } alt="Ícone de anterior" />
          </button>
          <button
            title="Próximo"
            type="button"
            onClick={ () => {
              scrollToElement(slideActive === end ? slideActive : (
                slideActive + 1));
            } }
          >
            <img src={ nextIcon } alt="Ícone de próximo" />
          </button>
        </div>
      </div>
      <div className="slides-cart">
        <div className="cart-items">
          { customerCart.length ? customerCart.map((itemCart) => (
            <span key={ itemCart.id }>
              <img src={ itemCart.image } alt="Imagem do Item" />
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
    </div>
  );
}

Slide.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  setCustomerCart: PropTypes.func.isRequired,
  customerCart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  })).isRequired,
  totalPrice: PropTypes.number.isRequired,
  amountItems: PropTypes.number.isRequired,
  slideActive: PropTypes.number.isRequired,
  scrollToElement: PropTypes.func.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
};

export default Slide;
