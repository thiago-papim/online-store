import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import CartButton from '../components/CartButton';
import ShoppingCart from './ShoppingCart';

class ProductDetails extends React.Component {
  state = { product: {} };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getProductById(id)
      .then((product) => this.setState({ product }));
  }

  render() {
    const { product: { title, pictures, price } } = this.state;
    return (
      <div>
        <h3 data-testid="product-detail-name">{title}</h3>
        { pictures && <img
          src={ pictures[0].url }
          data-testid="product-detail-image"
          alt={ title }
        /> }
        <h2 data-testid="product-detail-price">{`R$ ${price}`}</h2>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>

      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetails;
