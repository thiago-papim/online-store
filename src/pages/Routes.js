import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import ProductDetails from './Productdetails';
import NotFound from './NotFound';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/product/:id" component={ ProductDetails } />
        <Route path="/shopping-cart" component={ ShoppingCart } />
        <Route exact path="/" render={ (props) => <ProductList props={ props } /> } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default Routes;
