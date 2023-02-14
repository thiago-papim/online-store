import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/productList.css';

export default class ProductList extends React.Component {
  state = {
    products: [],
    query: '',
  };

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleClick = async ({ target }) => {
    const { id } = target;
    const { query } = this.state;
    if (id && query) {
      const response = await fetch(
        `https://api.mercadolibre.com/sites/MLB/search?category=${id}&q=${query}`,
      );
      const data = await response.json();
      this.setState({ products: data.results });
    } else if (!id && query) {
      const response = await fetch(
        `https://api.mercadolibre.com/sites/MLB/search?q=${query}`,
      );
      const data = await response.json();
      this.setState({ products: data.results });
    } else if (id && !query) {
      const response = await fetch(
        `https://api.mercadolibre.com/sites/MLB/search?category=${id}`,
      );
      const data = await response.json();
      this.setState({ products: data.results });
    }
  };

  render() {
    const { query, products } = this.state;
    const { addCart, cartProducts } = this.props;
    return (
      <div>
        <Header
          productList={ cartProducts }
          value={ query }
          onChange={ this.handleChange }
          handle={ this.handleClick }
        />
        <div className="main-container">
          <div className="sidebar">
            <Sidebar handle={ this.handleClick } />
          </div>
          <div>
            {products.length > 0 ? (
              <ul className="product-list">
                {products.map((product) => (
                  <li className="product" key={ product.id } data-testid="product">
                    <ProductCard
                      product={ product }
                      addCart={ addCart }
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p data-testid="empty-message">Nenhum produto foi encontrado</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ProductList.propTypes = {
  props: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  addCart: PropTypes.func.isRequired,
  cartProducts: PropTypes.arrayOf.isRequired,
};
