import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/header.css';

class Header extends React.Component {
  render() {
    const { productList, value, onChange, handle } = this.props;
    return (
      <header>
        <div className="div-header">
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <input
            type="text"
            value={ value }
            onChange={ onChange }
            data-testid="query-input"
            placeholder="Digite aqui"
          />
          <button onClick={ handle } data-testid="query-button">
            Buscar
          </button>
        </div>
        <div className="div-header">
          <img className="logo" src="https://i.ibb.co/GPQ08BD/default-transparent-1000x1000.png" alt="Logo" />
        </div>
        <div className="div-header">
          <div className="link">
            <Link
              data-count={ productList.length }
              className="teste"
              to="/shopping-cart"
            >
              <img
                className="carrinho-png"
                src="https://i.ibb.co/Tbc7wx9/kisspng-shopping-cart-computer-icons-white-cart-png-simple-5ab15d036a4b75-3538919915215731234354.png"
                alt="Carrinho de Compras"
              />
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  productList: PropTypes.arrayOf.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handle: PropTypes.func.isRequired,
};

export default Header;
