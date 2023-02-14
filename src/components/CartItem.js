import React from 'react';
import PropTypes from 'prop-types';

class CartItem extends React.Component {
  render() {
    const { item, removeFromCart, handleQuantityChange } = this.props;
    const { product, quantity } = item;
    console.log(item);
    return (
      <div
        data-testid="product-add-to-cart"
        className="div-cart"
      >
        <div className="cart-product">
          <img
            className="img-cart"
            src={ product.thumbnail }
            alt={ product.name }
          />
          <h4 data-testid="shopping-cart-product-name">{product.title}</h4>
        </div>
        <div>
          <p data-testid="shopping-cart-product-quantity">
            {`Quantidade: ${quantity}`}
          </p>
          <div className="div-buttons">
            <div>
              <button
                className="remove-to-cart"
                data-testid="product-decrease-quantity"
                onClick={ () => handleQuantityChange('minus', product) }
              >
                -
              </button>
              <button
                className="add-to-cart"
                data-testid="product-increase-quantity"
                onClick={ () => handleQuantityChange('plus', product) }
              >
                +
              </button>
            </div>
            <button
              className="remove"
              data-testid="remove-product"
              onClick={ () => removeFromCart(item.product.id) }
            >
              Remover do carrinho

            </button>
          </div>
        </div>
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
