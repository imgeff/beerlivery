/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SliderContext from './SliderContext';
import setActiveElement from '../../helpers/dom/setActiveElement';

function SliderProvider({ children }) {
  const [slideActive, setSlideActive] = useState(0);

  const [limits, setLimits] = useState({ start: 0, end: 1 });

  const scrollToSlide = (elementIndex) => {
    const HUNDRED = 100;
    const firstElement = document.querySelector('.first');
    const marginLeft = `${(elementIndex) * -HUNDRED}%`;
    firstElement.style.marginLeft = marginLeft;
    const elementSelector = `#radio-${elementIndex}`;
    setActiveElement('radio-active', elementSelector, true);
    setSlideActive(elementIndex);
  };

  const contextValue = {
    slideNavigation: {
      slideActive,
      setSlideActive,
      limits,
      setLimits,
      scrollToSlide,
    },
  };

  return (
    <SliderContext.Provider value={ contextValue }>
      {children}
    </SliderContext.Provider>
  );
}

SliderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SliderProvider;
