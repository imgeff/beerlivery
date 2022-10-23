import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import SlideDescription from './SlideDescription';
import SlideCart from './SlideCart';

function Slide({
  index,
  product: { price, urlImage, name, id },
  cart: { customerCart, setCustomerCart, totalPrice, amountItems },
}) {
  const itemIsInCard = customerCart.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(itemIsInCard ? itemIsInCard.quantity : 0);

  const changeCart = () => {
    const ONELESS = -1;
    const cart = [...customerCart];
    const indexOfItem = customerCart.findIndex((itemCart) => itemCart.id === id);
    const itemCard = {
      id,
      name,
      urlImage,
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

  useEffect(() => {
    changeCart();
  }, [quantity]);

  const productInfo = { price, name, id, quantity, setQuantity };

  const cart = { customerCart, totalPrice, amountItems };

  return (
    <div key={ id } className={ index === 0 ? 'slide first' : 'slide' }>
      <figure>
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt={ name }
          className="productImage"
        />
      </figure>
      <SlideDescription
        productInfo={ productInfo }
      />
      <SlideCart
        cart={ cart }
      />
    </div>
  );
}

Slide.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    urlImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  cart: PropTypes.shape({
    setCustomerCart: PropTypes.func.isRequired,
    customerCart: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      urlImage: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })).isRequired,
    totalPrice: PropTypes.number.isRequired,
    amountItems: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Slide;
