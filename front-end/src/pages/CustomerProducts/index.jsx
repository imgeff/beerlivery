import React, { useState, useEffect } from 'react';
import { getItemLocalStorage } from '../../helpers/localStorage';
import Header from '../../components/Header';
import Slider from '../../components/Slider';
import './style.css';
import SliderProvider from '../../context/Slider/SliderProvider';

function CustomerProductsPage() {
  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
    role: '',
    token: '',
  });

  const catchDataUser = () => {
    const data = getItemLocalStorage('user');
    setDataUser(data);
  };

  useEffect(() => {
    catchDataUser();
  }, []);

  return (
    <div className="customer-products">
      <Header
        buttonOne="Produtos"
        buttonTwo="Meus Pedidos"
        role={ dataUser.role }
        name={ dataUser.name }
        testId="customer_products__element-navbar-link-products"
        routeOne="/customer/products"
        routeTwo="/customer/orders"
      />
      <SliderProvider>
        <Slider />
      </SliderProvider>
    </div>
  );
}

export default CustomerProductsPage;
