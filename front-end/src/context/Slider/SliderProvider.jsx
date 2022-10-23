import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import SliderContext from './SliderContext';
import setActiveElement from '../../helpers/dom/setActiveElement';

const HUNDRED = 100;
const ONEPOINTTHREE = 1.3;

function SliderProvider({ children }) {
  const [slideActive, setSlideActive] = useState(0);

  const [limits, setLimits] = useState({ start: 0, end: 1 });

  const scrollToSlide = (elementIndex) => {
    const firstElement = document.querySelector('.first');
    const marginLeft = `${(elementIndex) * -HUNDRED - ONEPOINTTHREE}%`;
    firstElement.style.marginLeft = marginLeft;
    const elementSelector = `#radio-${elementIndex}`;
    setActiveElement('radio-active', elementSelector, true);
    setSlideActive(elementIndex);
  };

  const contextValue = useMemo(() => ({
    slideNavigation: {
      slideActive,
      setSlideActive,
      limits,
      setLimits,
      scrollToSlide,
    },
  }), [limits, slideActive]);

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
