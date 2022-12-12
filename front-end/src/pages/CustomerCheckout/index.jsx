import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { getItemLocalStorage } from '../../helpers/localStorage';
import CheckoutOrders from '../../components/CheckoutOrders';
import CheckoutForm from '../../components/CheckoutForm';
import './style.css';

function CustomerCheckoutPage() {
  const [products, setProducts] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalCard = () => {
    const total = products
      .reduce((prev, current) => prev + parseFloat(current.subTotal), 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalCard();
  }, [products]);

  const catchProducts = () => {
    const data = getItemLocalStorage('carrinho');
    setProducts(data);
  };

  useEffect(() => {
    catchProducts();
  }, []);

  return (
    <div className="customer-checkout">
      <Header
        buttonOne="Produtos"
        buttonTwo="Meus Pedidos"
        testId="customer_products__element-navbar-link-checkout"
        routeOne="/customer/products"
        routeTwo="/customer/orders"
      />
      <div className="customer-checkout-main">
        <CheckoutForm
          products={ products }
          totalPrice={ totalPrice }
        />
        <CheckoutOrders
          products={ products }
          setProducts={ setProducts }
          totalPrice={ totalPrice }
        />
      </div>
    </div>
  );
}

export default CustomerCheckoutPage;
