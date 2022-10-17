import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ButtonsFilter({ filter: { brandings, filterByBrand } }) {
  const mouseScrollFilters = (event) => {
    if (event.deltaY > 0) {
      event.target.scrollBy(160, 0)
    } else {
      event.target.scrollBy(-160, 0)
    }
  }

  return (
    <div className="buttons-wrapper" onWheel={ mouseScrollFilters }>
      <div>
        <div className="buttons-filter">
          <button
            id="filter-branding-0"
            className="button-filter active-filter-quaternary"
            type="button"
            onClick={ () => {
              filterByBrand('', '#filter-branding-0');
            } }
          >
            Sem filtro
          </button>
          { brandings.map(({ id, name }) => (
            <button
              key={ id }
              id={ `filter-branding-${id}` }
              className="button-filter"
              type="button"
              onClick={ () => filterByBrand(name, `#filter-branding-${id}`) }
            >
              { name }
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

ButtonsFilter.propTypes = {
  filter: PropTypes.shape({
    filterByBrand: PropTypes.func,
    brandings: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
  }).isRequired,
};

export default ButtonsFilter;
