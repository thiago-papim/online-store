import React from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends React.Component {
  render() {
    const { product } = this.props;
    const { title, thumbnail, price, shipping } = product;
    return (
      <div>
        <p>{title}</p>
        <img src={ thumbnail } alt={ title } />
        <p>{price}</p>
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
