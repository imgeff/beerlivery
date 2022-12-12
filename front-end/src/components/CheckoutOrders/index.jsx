import React from 'react';
import PropTypes from 'prop-types';
import TrashIcon from '../../images/icons/trash.svg';
import CartIcon from '../../images/icons/cart-gold.svg';
import { setItemLocalStorage } from '../../helpers/localStorage';
import './style.css';

function CheckoutOrders({ products, setProducts, totalPrice }) {
  const deleteProduct = (index) => {
    const cloneProducts = [...products];
    cloneProducts.splice(index, 1);
    setProducts(cloneProducts);
    setItemLocalStorage('carrinho', cloneProducts);
  };

  return (
    <div className="checkout-orders">
      <h1>
        Carrinho
        <img src={ CartIcon } alt="Ícone de carrinho de compras" />
      </h1>
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Descrição</td>
            <td>Quantidade</td>
            <td>Valor Unitário</td>
            <td>Sub-total</td>
            <td>Remover Item</td>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product, index) => (
              <tr
                key={ product.id }
              >

                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  <img
                    id="table-product-picture"
                    src={ product.urlImage }
                    alt="Imagem do Item"
                  />
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-name-${index}`
                  }
                >
                  { product.name }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  { product.quantity }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  R$
                  {' '}
                  { product.price.replace('.', ',') }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  R$
                  {' '}
                  { product.subTotal.toFixed(2).replace('.', ',') }
                </td>
                <td>
                  <button
                    type="button"
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                    onClick={ () => deleteProduct(index) }
                  >
                    <img
                      id="table-trash-icon"
                      src={ TrashIcon }
                      alt="Ícone de uma lixeira"
                    />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={ 6 }>
              {`Total: R$ ${totalPrice.toFixed(2).replace('.', ',')}`}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

CheckoutOrders.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  setProducts: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default CheckoutOrders;
