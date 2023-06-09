import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import ProductDetails from './Productdetails';
import NotFound from './NotFound';
import Checkout from './Checkout';

class Routes extends React.Component {
  render() {
    const { removeFromCart, addCart, cartProducts, handleQuantityChange } = this.props;
    return (
      <Switch>
        <Route
          path="/checkout"
          render={ (props) => (
            <Checkout
              { ...props }
              clear={ this.setOuterState }
              cartProducts={ cartProducts }
            />) }
        />
        <Route
          path="/product/:id"
          render={ (props) => (<ProductDetails
            addCart={ addCart }
            props={ props }
          />) }
        />
        <Route
          path="/shopping-cart"
          render={ (props) => (<ShoppingCart
            props={ props }
            handleQuantityChange={ handleQuantityChange }
            cartProducts={ cartProducts }
            removeFromCart={ removeFromCart }
          />) }
        />
        <Route
          exact
          path="/"
          render={ (props) => (<ProductList
            props={ props }
            addCart={ addCart }
            cartProducts={ cartProducts }
          />) }
        />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

Routes.propTypes = {
  removeFromCart: PropTypes.func.isRequired,
  addCart: PropTypes.func.isRequired,
  cartProducts: PropTypes.arrayOf.isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
};

export default Routes;
