import React from 'react';
import PropTypes from 'prop-types';

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: '1',
    };
  }

  handleQuantityChange = (quantity) => {
    this.setState({ quantity });
  };

  render() {
    const { item, removeFromCart } = this.props;
    const { quantity } = this.state;
    return (
      <div data-testid="product-add-to-cart">
        <h4 data-testid="shopping-cart-product-name">{item.title}</h4>
        <p data-testid="shopping-cart-product-quantity">
          {quantity}
        </p>
        <button
          data-testid="product-decrease-quantity"
          onClick={ () => this.handleQuantityChange(parseFloat(quantity) - 1) }
        >
          -
        </button>
        <button
          data-testid="product-increase-quantity"
          onClick={ () => this.handleQuantityChange(parseFloat(quantity) + 1) }
        >
          +
        </button>
        <button
          data-testid="remove-product"
          onClick={ () => removeFromCart(item.id) }
        >
          Remover do carrinho

        </button>
      </div>
    );
  }
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default CartItem;
