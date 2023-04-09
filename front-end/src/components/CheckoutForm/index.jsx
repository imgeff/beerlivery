import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { setItemLocalStorage } from '../../helpers/localStorage';
import { fetchPost, getAll } from '../../helpers/api/requests';
import GlobalContext from '../../context/Global/GlobalContext';
import './style.css';

function CheckoutForm({ totalPrice, products }) {
  const { userData } = useContext(GlobalContext);

  const history = useHistory();

  const [sellers, setSellers] = useState([]);

  const [deliveryInfo, setDeliveryInfo] = useState({
    sellerName: 'Fulana Pereira',
    sellerId: 2,
    address: '',
    number: '',
  });

  const getSellers = async () => {
    const response = await getAll('users');
    const filterSeller = response.filter((seller) => (seller.role === 'seller'));
    setSellers(filterSeller);
  };

  const registerNewSale = async () => {
    const arrayProducts = [];

    products.map((product) => (
      arrayProducts.push({ productId: product.id, quantity: product.quantity })
    ));

    setItemLocalStorage('carrinho', products);

    const newSale = {
      userId: userData.user.id,
      sellerId: deliveryInfo.sellerId,
      totalPrice,
      deliveryAddress: deliveryInfo.address,
      deliveryNumber: deliveryInfo.number,
      status: 'Pendente',
      products: arrayProducts,
    };

    const response = await fetchPost(newSale, 'sales', userData.user.token);

    if (response.message === undefined) history.push('orders');
  };

  const handleDeliveryData = ({ target }) => {
    if (target.name === 'sellerName') {
      const infoSeller = sellers.find((seller) => seller.name === target.value);
      setDeliveryInfo({
        ...deliveryInfo, [target.name]: target.value, sellerId: infoSeller.id });
    } else {
      setDeliveryInfo({ ...deliveryInfo, [target.name]: target.value });
    }
  };

  useEffect(() => {
    getSellers();
  }, []);

  return (
    <div className="checkout-form">
      <h1>Detalhes e Endereço para Entrega</h1>
      <form>
        <label htmlFor="select-seller">
          P.Vendedora Responsável
          <select
            data-testid="customer_checkout__select-seller"
            onChange={ handleDeliveryData }
            value={ deliveryInfo.sellerName }
            name="sellerName"
          >
            {
              sellers.map((seller) => (
                <option
                  key={ seller.id }
                >
                  {seller.name}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="input-address">
          Endereço
          <input
            data-testid="customer_checkout__input-address"
            type="text"
            onChange={ handleDeliveryData }
            name="address"
            value={ deliveryInfo.address }
            placeholder="Travessa Terceira da Castanheira, Bairro Muricy"
          />
        </label>
        <label htmlFor="input-address">
          Número
          <input
            data-testid="customer_checkout__input-addressNumber"
            type="text"
            onChange={ handleDeliveryData }
            name="number"
            value={ deliveryInfo.number }
            placeholder="198"
          />
        </label>
        <button
          data-testid="customer_checkout__button-submit-order"
          type="button"
          onClick={ registerNewSale }
        >
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
}

CheckoutForm.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default CheckoutForm;
