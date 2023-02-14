import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import '../styles/shoppingCart.css';

class ShoppingCart extends React.Component {
  render() {
    const { cartProducts, removeFromCart, handleQuantityChange, props } = this.props;
    console.log(cartProducts);
    const teste = cartProducts
      .reduce((acc, curr) => {
        let acumulator = acc;
        acumulator += curr.product.price * curr.quantity;
        return acumulator;
      }, 0);
    const { history } = props;
    const vazio = 'Seu carrinho está vazio';
    return (
      <div className="container">
        <div className="header-shopping">
          <button
            className="btn-shopping"
            onClick={ () => history.push('/') }
          >
            Voltar

          </button>
          <div className="cart-and-image">
            <img
              src="https://i.ibb.co/GPQ08BD/default-transparent-1000x1000.png"
              alt="Carrinho de Compras"
            />
          </div>
          <div className="link-cart">
            <Link
              data-count={ cartProducts.length }
              className="cart-count"
              to="/shopping-cart"
            >
              <img
                className="carrinho-png2"
                src="https://imageup.me/images/ba80c776-550a-4342-be4b-10cdd82ac020.png"
                alt="Carrinho de Compras"
              />
            </Link>
          </div>
        </div>
        <div className="shopping-and-finish">
          <div className="items">
            <h1>Carrinho de Compras</h1>
            { cartProducts.length > 0 ? cartProducts.map((item) => (
              <CartItem
                key={ item.product.id }
                item={ item }
                removeFromCart={ removeFromCart }
                handleQuantityChange={ handleQuantityChange }
              />
            )) : (<h4 data-testid="shopping-cart-empty-message">{vazio}</h4>)}
          </div>
          <div className="purchase">
            <h2>Valor total da compra:</h2>
            <p>{`R$ ${teste.toFixed(2)}`}</p>
            <button
              className="btn-shopping"
              onClick={ () => history.push('/checkout') }
            >
              Finalizar Compra

            </button>
          </div>
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  props: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  cartProducts: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
};

export default ShoppingCart;
