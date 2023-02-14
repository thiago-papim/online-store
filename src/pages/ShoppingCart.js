import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

class ShoppingCart extends React.Component {
  // componentDidMount() {
  //   const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  // }

  // componentDidUpdate() {
  //   const { location: { products } } = this.state;
  //   localStorage.setItem('cartItems', JSON.stringify(products));
  // }
  
  render() {
    const { cartProducts, removeFromCart, handleQuantityChange } = this.props;
    return (
      <div>
        <Link to="/checkout" data-testid="checkout-products">Finalizar Compra</Link>
        <h1>Carrinho de Compras</h1>
        { cartProducts.length > 0 ? cartProducts.map((item) => (
          <CartItem
            key={ item.product.id }
            item={ item }
            removeFromCart={ removeFromCart }
            handleQuantityChange={ handleQuantityChange }
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
  handleQuantityChange: PropTypes.func.isRequired,
};

export default ShoppingCart;
