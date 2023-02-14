import PropTypes from 'prop-types';
import React from 'react';
// import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
/* import CartButton from '../components/CartButton';
import ShoppingCart from './ShoppingCart'; */
import Review from '../components/Review';
import BtnAddCart from '../services/BtnAddCart';

class ProductDetails extends React.Component {
  state = { product: {} };

  componentDidMount() {
    const { props: { match: { params: { id } } } } = this.props;
    getProductById(id)
      .then((product) => this.setState({ product }));
  }

  render() {
    const { product, product: { title, pictures, price } } = this.state;
    const { addCart } = this.props;
    return (
      <div>
        <h3 data-testid="product-detail-name">{title}</h3>
        { pictures && <img
          src={ pictures[0].url }
          data-testid="product-detail-image"
          alt={ title }
        /> }
        <h2 data-testid="product-detail-price">{`R$ ${price}`}</h2>
        <BtnAddCart
          product={ product }
          addCart={ addCart }
          datatestid="product-detail-add-to-cart"
        />
        <Review />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  props: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  }).isRequired,
  addCart: PropTypes.func.isRequired,
};

export default ProductDetails;
