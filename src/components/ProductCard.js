import React from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css';

export default class ProductCard extends React.Component {
  render() {
    const { productName, productPrice, productImage } = this.props;
    return (
      <div className="card-container">
        <p className="product-name">{productName}</p>
        <img className="product-image" src={ productImage } alt={ productName } />
        <p>{`R$ ${productPrice.toFixed(2)}`}</p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  productName: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  productImage: PropTypes.string.isRequired,
};
