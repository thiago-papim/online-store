import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import '../styles/productList.css';
import CartButton from '../components/CartButton';

export default class ProductList extends React.Component {
  state = {
    products: [],
    query: '',
    productList: [],
  };

  componentDidMount() {
    const list = JSON.parse(localStorage.getItem('cartItems'));
    if (list) { this.setState({ productList: list }); }
  }

  componentDidUpdate() {
    const { productList } = this.state;
    localStorage.setItem('cartItems', JSON.stringify(productList));
  }

  addCart = (product) => {
    const { productList } = this.state;
    this.setState({ productList: [...productList, product] }, () => {
    });
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

  removeFromCart = (itemId) => {
    console.log(itemId);
    const { productList } = this.state;
    const updatedItems = productList.filter((item) => {
      console.log(item.id);
      return item.id !== itemId;
    });
    console.log(updatedItems);
    this.setState({ productList: updatedItems });
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  render() {
    const { query, products, productList } = this.state;
    return (
      <div className="main-container">
        <div className="sidebar">
          <Sidebar handle={ this.handleClick } />
        </div>
        <div>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <Link
            to={ {
              pathname: '/shopping-cart',
              state: {
                productList,
              },
              removeFromCart: this.removeFromCart,
            } }
          >
            <CartButton productList={ productList } />
          </Link>
          <input
            type="text"
            value={ query }
            onChange={ this.handleChange }
            data-testid="query-input"
          />
          <button onClick={ this.handleClick } data-testid="query-button">
            Search
          </button>
          {products.length > 0 ? (
            <ul className="product-list">
              {products.map((product) => (
                <li key={ product.id } data-testid="product">
                  <ProductCard
                    product={ product }
                    addCart={ this.addCart }
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p data-testid="empty-message">Nenhum produto foi encontrado</p>
          )}
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
};
