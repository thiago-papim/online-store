import React from 'react';
import PropTypes from 'prop-types';

class BtnAddCart extends React.Component {
  render() {
    const { product, addCart } = this.props;
    return (
      <input
        type="button"
        data-testid="product-add-to-cart"
        value="Adicionar ao Carrinho"
        onClick={ () => addCart(product) }
      />
    );
  }
}

BtnAddCart.propTypes = {
  product: PropTypes.string.isRequired,
  addCart: PropTypes.func.isRequired,
};

export default BtnAddCart;
