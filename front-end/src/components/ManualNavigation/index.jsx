import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SliderContext from '../../context/Slider/SliderContext';
import './style.css';

function ManualNavigation({ products }) {
  const {
    slideNavigation: {
      scrollToSlide,
    },
  } = useContext(SliderContext);

  return (
    <div className="manual-navigation">
      {products.map(({ id, name }, index) => (
        <label
          key={ id }
          htmlFor={ `element-${index}` }
          className={ index === 0 ? 'manual-btn radio-active' : 'manual-btn' }
          id={ `radio-${index}` }
          title={ name }
        >
          <input
            className="slide-check"
            type="radio"
            name="radio-btn"
            id={ `element-${index}` }
            onClick={ () => scrollToSlide(index) }
          />
        </label>
      ))}
    </div>
  );
}

ManualNavigation.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    urlImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  })).isRequired,
};

export default ManualNavigation;
