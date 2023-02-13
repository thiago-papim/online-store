import React from 'react';
import PropTypes from 'prop-types';

class BtnAddCart extends React.Component {
  render() {
    const { product, addCart, datatestid } = this.props;
    return (
      <input
        type="button"
        data-testid={ datatestid }
        value="Adicionar ao Carrinho"
        onClick={ () => addCart(product) }
      />
    );
  }
}

BtnAddCart.propTypes = {
  product: PropTypes.string.isRequired,
  addCart: PropTypes.func.isRequired,
  datatestid: PropTypes.string.isRequired,
};

export default BtnAddCart;
