import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

class ShoppingCart extends React.Component {
  componentDidUpdate() {
    const { cartProducts } = this.props;
    localStorage.setItem('cartItems', JSON.stringify(cartProducts));
  }

  render() {
    const { cartProducts, removeFromCart } = this.props;
    return (
      <div>
        <Link to="/checkout" data-testid="checkout-products">Finalizar Compra</Link>
        <h1>Carrinho de Compras</h1>
        { cartProducts.length > 0 ? cartProducts.map((item) => (
          <CartItem
            key={ item.id }
            item={ item }
            removeFromCart={ removeFromCart }
            quantityItem={ this.quantityItem }
          />
        )) : (<h4 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h4>)}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  props: PropTypes.shape({
    location: PropTypes.shape({
      products: PropTypes.arrayOf().isRequired,
    }).isRequired,
  }).isRequired,
  cartProducts: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default ShoppingCart;
