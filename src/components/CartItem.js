import React from 'react';
import PropTypes from 'prop-types';

class CartItem extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     quantity: '1',
  //   };
  // }

  render() {
    const { item, removeFromCart, handleQuantityChange } = this.props;
    const { product, quantity } = item;
    return (
      <div data-testid="product-add-to-cart">
        <h4 data-testid="shopping-cart-product-name">{product.title}</h4>
        <p data-testid="shopping-cart-product-quantity">
          {quantity}
        </p>
        <button
          data-testid="product-decrease-quantity"
          onClick={ () => handleQuantityChange('minus', product) }
        >
          -
        </button>
        <button
          data-testid="product-increase-quantity"
          onClick={ () => handleQuantityChange('plus', product) }
        >
          +
        </button>
        <button
          data-testid="remove-product"
          onClick={ () => removeFromCart(item.product.id) }
        >
          Remover do carrinho

        </button>
      </div>
    );
  }
}

CartItem.propTypes = {
  item: PropTypes.shape({
    product: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      quantity: PropTypes.number,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
};

export default CartItem;
