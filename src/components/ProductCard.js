import React from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css';

export default class ProductCard extends React.Component {
  render() {
    const { product } = this.props;
    const { title, thumbnail, price, shipping } = product;
    return (
      <div className="card-container">
        <p className="product-name">{title}</p>
        <img className="product-image" src={ thumbnail } alt={ title } />
        <p>{`R$ ${price.toFixed(2)}`}</p>
        {
          shipping.free_shipping
            && <strong data-testid="free-shipping">Frete Grátis</strong>
        }
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.objectOf().isRequired,
};
