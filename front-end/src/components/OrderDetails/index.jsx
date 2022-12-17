/* eslint-disable react/jsx-max-depth */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import updateOrderStatus from '../../services/Orders/updateOrderStatus';
import GlobalContext from '../../context/Global/GlobalContext';

function OrderDetails({ order }) {
  const { id, totalPrice, seller, saleDate, status } = order[0].sale;

  const {
    api: { messageError, setMessageError },
    style: { indicatorColors },
  } = useContext(GlobalContext);

  const [orderStatus, setOrderStatus] = useState(status);

  const handleDelivery = async () => {
    const response = await updateOrderStatus('Entregue', id);

    if (response.message) {
      setMessageError(response.message);
    } else {
      setOrderStatus(response.status);
    }
  };

  return (
    <div className="order-details checkout-orders">
      {messageError && <h2>{messageError}</h2>}
      <table>
        <thead>
          <tr className="table-header">
            <td>{`Pedido ${id}`}</td>
            <td>{`P.Vendedora: ${seller.name}`}</td>
            <td title="Data do Pedido">
              {new Date(saleDate).toLocaleDateString('pt-br')}
            </td>
            <td
              title="Status"
              style={ { background: indicatorColors[orderStatus] } }
            >
              {orderStatus}
            </td>
            <td>
              <button
                type="button"
                onClick={ handleDelivery }
                disabled={ orderStatus === 'Entregue' }
              >
                Confirmar Entrega
              </button>
            </td>
          </tr>
          <tr>
            <td>Item</td>
            <td>Nome do Item</td>
            <td>Quantidade</td>
            <td>Valor Unitário</td>
            <td>Sub-total</td>
          </tr>
        </thead>
        <tbody>
          {
            order.map(({ product, quantity }) => (
              <tr
                key={ product.name }
              >

                <td>
                  <img
                    id="table-product-picture"
                    src={ product.urlImage }
                    alt="Imagem do Item"
                  />
                </td>
                <td>
                  { product.name }
                </td>
                <td>
                  { quantity }
                </td>
                <td>
                  R$
                  {' '}
                  { product.price.replace('.', ',') }
                </td>
                <td>
                  R$
                  {' '}
                  { (product.price * quantity).toFixed(2).replace('.', ',') }
                </td>
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={ 6 }>
              {`Total: R$ ${Number(totalPrice).toFixed(2).replace('.', ',')}`}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

OrderDetails.propTypes = {
  order: PropTypes.arrayOf(PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    product: PropTypes.shape({
      brandingId: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.string,
      urlImage: PropTypes.string,
    }).isRequired,
    sale: PropTypes.shape({
      id: PropTypes.number,
      deliveryAddress: PropTypes.string,
      deliveryNumber: PropTypes.string,
      status: PropTypes.string,
      totalPrice: PropTypes.string,
      saleDate: PropTypes.string,
      seller: PropTypes.shape({
        name: PropTypes.string,
      }).isRequired,
    }).isRequired,
  })).isRequired,
};

export default OrderDetails;
