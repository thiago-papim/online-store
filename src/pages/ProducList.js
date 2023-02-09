import React from 'react';
import PropTypes from 'prop-types';

export default class ProductList extends React.Component {
  render() {
    const { props: { history } } = this.props;
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
