import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BtnAddCart from '../services/BtnAddCart';
import './ProductCard.css';

export default class ProductCard extends React.Component {
  render() {
    const { addCart, product } = this.props;
    const { title, thumbnail, price, shipping } = product;
    return (
      <div className="card-container">
        <Link
          to={ `/product/${product.id}` }
          data-testid="product-detail-link"
          className="link-details"
        >
          <div className="back-image">
            <img className="product-image" src={ thumbnail } alt={ title } />
            <p className="price">{`R$ ${price.toFixed(2)}`}</p>
          </div>
          <div>
            <p
              className="title"
              data-testid="shopping-cart-product-name"
            >
              {product.title}

            </p>
          </div>
        </Link>
        <BtnAddCart
          datatestid="product-add-to-cart"
          product={ product }
          addCart={ addCart }
        />
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
  addCart: PropTypes.func.isRequired,
};
