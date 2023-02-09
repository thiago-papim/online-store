import React from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends React.Component {
  render() {
    const { productName, productPrice, productImage } = this.props;
    return (
      <div data-testid="product">
        <p>{productName}</p>
        <img src={ productImage } alt={ productName } />
        <p>{productPrice}</p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  productName: PropTypes.string.isRequired,
  productPrice: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
};
