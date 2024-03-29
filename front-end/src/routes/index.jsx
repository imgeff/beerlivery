import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from '../pages/Login';
import CustomerProductsPage from '../pages/CustomerProducts';
import CustomerCheckoutPage from '../pages/CustomerCheckout';
import CustomerOrdersPage from '../pages/CustomerOrders';
import CustomerDetailsPage from '../pages/CustomerDetails';
import SellerOrdersPage from '../pages/SellerOrdersPage';
import SellerDetailsPage from '../pages/SellerDetailsPage';
import AdminManagePage from '../pages/AdminManagePage';
import Home from '../pages/Home';
// import NotFound from '../pages/NotFound';

function Routes() {
  return (
    <>
      <Route exact path="/" component={ Home } />
      <Route exact path="/login" component={ LoginPage } />
      <Route exact path="/register" component={ LoginPage } />
      <Route exact path="/customer/products" component={ CustomerProductsPage } />
      <Route exact path="/customer/checkout" component={ CustomerCheckoutPage } />
      <Route exact path="/customer/orders" component={ CustomerOrdersPage } />
      <Route
        exact
        path="/customer/orders/:id"
        component={ CustomerDetailsPage }
      />
      <Route exact path="/seller/orders" component={ SellerOrdersPage } />
      <Route exact path="/seller/orders/:id" component={ SellerDetailsPage } />
      <Route exact path="/admin/manage" component={ AdminManagePage } />
      {/* <Route exact path="*" component={ NotFound } /> */}
    </>
  );
}

export default Routes;
