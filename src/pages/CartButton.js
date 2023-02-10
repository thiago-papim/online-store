import React from 'react';
import PropTypes from 'prop-types';

export default class CartButton extends React.Component {
  render() {
    const { history } = this.props;
    const counter = ['', '', '']; /* localStorage.getItem('cartItems'); */
    return (
      <button
        data-testid="shopping-cart-button"
        onClick={ () => history.push('/shopping-cart') }
      >
        Carrinho de Compras
        {' '}
        <span>{` (${counter.length})`}</span>
      </button>
    );
  }
}

CartButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
