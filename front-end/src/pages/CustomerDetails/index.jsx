import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import OrderDetails from '../../components/OrderDetails';
import GlobalContext from '../../context/Global/GlobalContext';
import { getAll } from '../../helpers/api/requests';
import { getItemLocalStorage } from '../../helpers/localStorage';
import './style.css';

function CustomerDetailsPage() {
  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
    role: '',
    token: '',
    id: '',
  });

  const [order, setOrder] = useState();

  const { api: { messageError, setMessageError } } = useContext(GlobalContext);

  const params = useParams();

  const catchDataUser = () => {
    const data = getItemLocalStorage('user');
    setDataUser(data);
  };

  const getOrder = async () => {
    const response = await getAll(`orders/${params.id}`);
    if (response.message) {
      setMessageError(response.message);
    } else {
      setOrder(response);
    }
  };

  useEffect(() => {
    catchDataUser();
    getOrder();
  }, []);

  return (
    <div>
      <Header
        buttonOne="Produtos"
        buttonTwo="Meus Pedidos"
        role={ dataUser.role }
        name={ dataUser.name }
        testId="customer_products__element-navbar-link-products"
        routeOne="/customer/products"
      />
      <div className="details-container">
        <h1>Detalhe do Pedido</h1>
        {messageError && <h2>{messageError}</h2>}
        {order && <OrderDetails order={ order } />}
      </div>
    </div>
  );
}

export default CustomerDetailsPage;
