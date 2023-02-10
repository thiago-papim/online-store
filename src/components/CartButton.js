import React from 'react';
import PropTypes from 'prop-types';

export default class CartButton extends React.Component {
  render() {
    const { productList } = this.props;
    return (
      <button
        data-testid="shopping-cart-button"
      >
        Carrinho de Compras
        {' '}
        <span data-testid="shopping-cart-size">{` (${productList.length})`}</span>
      </button>
    );
  }
}

CartButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  productList: PropTypes.arrayOf().isRequired,
};
