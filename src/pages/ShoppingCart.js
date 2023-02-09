import React from 'react';

class ShoppingCart extends React.Component {
  render() {
    return (
      <div>
        <h1>Carrinho de compras</h1>
        <p
          data-testid="shopping-cart-empty-message"
        >
          Seu carrinho está vazio
        </p>
      </div>
    );
  }
}

export default ShoppingCart;
