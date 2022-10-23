import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import nextIcon from '../../../../images/icons/chevron-right.svg';
import prevIcon from '../../../../images/icons/chevron-left.svg';
import SliderContext from '../../../../context/Slider/SliderContext';
import './style.css';

const MINUSFIVE = -5;

function SlideDescription({ productInfo: { id, name, price, quantity, setQuantity } }) {
  const {
    slideNavigation: {
      slideActive,
      scrollToSlide,
      limits: { start, end },
    },
  } = useContext(SliderContext);

  const updateItem = ({ target }) => {
    const targetToNumber = !target.value ? 0 : parseFloat(target.value);
    setQuantity(targetToNumber);
  };

  return (
    <div className="slide-description">
      <div className="slide-info">
        Nome
        <div>
          <span data-testid={ `customer_products__element-card-title-${id}` }>
            {name.slice(0, MINUSFIVE)}
          </span>
        </div>
        Quantidade
        <div>
          <span>
            {name.slice(MINUSFIVE)}
          </span>
        </div>
        Preço
        <div>
          <span
            id="slide-info-price"
            data-testid={ `customer_products__element-card-price-${id}` }
          >
            {`R$ ${price.replace('.', ',')}`}
          </span>
        </div>

      </div>
      <div className="slide-operations">
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
      <div className="slide-navigators">
        <button
          title="Anterior"
          type="button"
          onClick={ () => {
            scrollToSlide(slideActive > start ? slideActive - 1 : (
              slideActive));
          } }
        >
          <img src={ prevIcon } alt="Ícone de anterior" />
          <span>Anterior</span>
        </button>
        <button
          title="Próximo"
          type="button"
          onClick={ () => {
            scrollToSlide(slideActive === end ? slideActive : (
              slideActive + 1));
          } }
        >
          <span>Próximo</span>
          <img src={ nextIcon } alt="Ícone de próximo" />
        </button>
      </div>
    </div>
  );
}

SlideDescription.propTypes = {
  productInfo: PropTypes.shape({
    id: PropTypes.number,
    urlImage: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
    setQuantity: PropTypes.func,
  }).isRequired,
};

export default SlideDescription;
