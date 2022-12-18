import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAll } from '../../helpers/api/requests';
import { getItemLocalStorage } from '../../helpers/localStorage';
import Header from '../../components/Header';
import './style.css';
import GlobalContext from '../../context/Global/GlobalContext';

function CustomerOrders() {
  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
    role: '',
    token: '',
    id: '',
  });

  const [sales, setSales] = useState([]);

  const { style: { indicatorColors } } = useContext(GlobalContext);

  const history = useHistory();

  const catchDataUser = () => {
    const data = getItemLocalStorage('user');
    setDataUser(data);
  };

  const getUserSales = async () => {
    const data = getItemLocalStorage('user'); // ou estado dataUser
    const userId = data.id;
    const response = await getAll(`sales/customer/${userId}`);
    setSales(response.reverse());
  };

  const convertDate = (date) => {
    const newDate = date.split(/[- :]/);
    const day = newDate[2].slice(0, 2);
    const convertedDate = `${day}/${newDate[1]}/${newDate[0]}`;
    return convertedDate;
  };

  const redirectToDetails = (id) => {
    history.push(`/customer/orders/${id}`);
  };

  useEffect(() => {
    catchDataUser();
    getUserSales();
  }, []);

  return (
    <>
      <Header
        buttonOne="Produtos"
        buttonTwo="Meus Pedidos"
        role={ dataUser.role }
        name={ dataUser.name }
        testId="customer_products__element-navbar-link-products"
        routeOne="/customer/products"
      />
      <div className="orders">
        {sales.map((sale) => (
          <button
            key={ sale.id }
            type="button"
            onClick={ () => redirectToDetails(sale.id) }
            className="order-container"
          >
            <div>
              <p> Pedido </p>
              <p data-testid={ `customer_orders__element-order-id-${sale.id}` }>
                {`${sale.id}`}
              </p>
            </div>
            <p
              data-testid={ `customer_orders__element-delivery-status-${sale.id}` }
              style={ { color: indicatorColors[sale.status] } }
            >
              {sale.status}
            </p>
            <div>
              <p data-testid={ `customer_orders__element-order-date-${sale.id}` }>
                {convertDate(sale.saleDate)}
              </p>
              <p data-testid={ `customer_orders__element-card-price-${sale.id}` }>
                {`R$ ${sale.totalPrice.replace('.', ',')}`}
              </p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

export default CustomerOrders;
