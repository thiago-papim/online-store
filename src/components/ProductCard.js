import React from 'react';
import PropTypes from 'prop-types';
import BtnAddCart from '../services/BtnAddCart';

export default class ProductCard extends React.Component {
  render() {
    const { addCart, product, productName, productPrice, productImage } = this.props;
    return (
      <div>
        <p>{productName}</p>
        <img src={ productImage } alt={ productName } />
        <p>{productPrice}</p>
        <BtnAddCart product={ product } addCart={ addCart } />
      </div>
    );
  }
}

ProductCard.propTypes = {
  productName: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  productImage: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  addCart: PropTypes.func.isRequired,
};
