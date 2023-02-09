import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';

export default class ProductList extends React.Component {
  state = {
    productName: [],
    query: '',
  };

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleClick = async () => {
    const { query } = this.state;
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=${query}`,
    );
    const data = await response.json();
    this.setState({ productName: data.results });
  };

  render() {
    const { props: { history } } = this.props;
    const { query, productName } = this.state;
    return (
      <div>
        <input />
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
        {productName.length > 0 ? (
          <ul>
            {productName.map((product) => (
              <li key={ product.id } data-testid="product">
                <ProductCard
                  productName={ product.title }
                  productImage={ product.thumbnail }
                  productPrice={ product.price }
                />
              </li>
            ))}
          </ul>
        ) : (
          <p data-testid="empty-message">Nenhum produto foi encontrado</p>
        )}
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
