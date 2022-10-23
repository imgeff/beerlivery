import React from 'react';
import PropTypes from 'prop-types';

function ButtonSelect({ icon, altIcon, eventClick, valueEvent, children }) {
  return (
    <button type="button" onClick={ () => eventClick(valueEvent) }>
      <img src={ icon } alt={ altIcon } />
      <span>{ children }</span>
    </button>
  );
}

ButtonSelect.defaultProps = {
  icon: null,
  altIcon: null,
  eventClick: null,
  valueEvent: false,
};

ButtonSelect.propTypes = {
  icon: PropTypes.string,
  altIcon: PropTypes.string,
  eventClick: PropTypes.func,
  valueEvent: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

export default ButtonSelect;
