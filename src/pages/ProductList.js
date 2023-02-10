import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import '../styles/productList.css';

export default class ProductList extends React.Component {
  state = {
    products: [],
    query: '',
    productList: [],
  };

  componentDidMount() {
    const list = JSON.parse(localStorage.getItem('cartItems'));
    console.log(list);
    if (list) { this.setState({ productList: list }); }
  }

  componentDidUpdate() {
    const { productList } = this.state;
    console.log(productList);
  }

  addCart = (product) => {
    const { productList } = this.state;
    this.setState({ productList: [...productList, product] }, () => {
      localStorage.setItem('cartItems', JSON.stringify(productList));
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

  render() {
    const { props: { history } } = this.props;
    const { query, products } = this.state;
    return (
      <div className="main-container">
        <div className="sidebar">
          <Sidebar handle={ this.handleClick } />
        </div>
        <div>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <input
            type="button"
            value="Carrinho de Compras"
            data-testid="shopping-cart-button"
            onClick={ () => history.push('/shopping-cart') }
          />
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
            <ul>
              {products.map((product) => (
                <li key={ product.id } data-testid="product">
                  <ProductCard
                    productName={ product.title }
                    productImage={ product.thumbnail }
                    productPrice={ product.price }
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
