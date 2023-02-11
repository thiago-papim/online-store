import React from 'react';
import PropTypes from 'prop-types';
import CartItem from '../components/CartItem';

class ShoppingCart extends React.Component {
  componentDidMount() {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  }

  componentDidUpdate() {
    const { location: { products } } = this.state;
    localStorage.setItem('cartItems', JSON.stringify(products));
  }

  render() {
    const { location: {
      state: {
        productList,
      },
      removeFromCart,
    } } = this.props;
    console.log(productList);
    return (
      <div>
        <h1>Carrinho de Compras</h1>
        { productList?.map((item) => (
          <CartItem
            key={ item.id }
            item={ item }
            removeFromCart={ removeFromCart }
          />
        ))}
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
};

export default ShoppingCart;
