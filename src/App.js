import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Routes from './pages/Routes';
import CartButton from './components/CartButton';

class App extends React.Component {
  state = {
    cartProducts: [],
  };

  componentDidMount() {
    const list = JSON.parse(localStorage.getItem('cartItems'));
    if (list) { this.setState({ cartProducts: list }); }
  }

  componentDidUpdate() {
    const { cartProducts } = this.state;
    localStorage.setItem('cartItems', JSON.stringify(cartProducts));
  }

  addCart = (product) => {
    const { cartProducts } = this.state;
    const productAlreadyExist = cartProducts.some((item) => item.product === product);
    if (productAlreadyExist) {
      const productInCart = cartProducts
        .find((item) => product.id === item.product.id);
      const theProduct = {
        product,
        quantity: productInCart.quantity + 1,
      };
      const indexOfProduct = cartProducts
        .findIndex((item) => item.product === theProduct.product);
      const newArray = [...cartProducts];
      newArray[indexOfProduct] = theProduct;
      this.setState({
        cartProducts: newArray,
      });
    } else {
      this.setState({ cartProducts: [...cartProducts, {
        product,
        quantity: 1,
      },
      ] });
    }
  };

  removeFromCart = (itemId) => {
    const { cartProducts } = this.state;
    const updatedItems = cartProducts.filter((item) => item.product.id !== itemId);
    this.setState({ cartProducts: updatedItems });
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  handleQuantityChange = (operator, selectedProduct) => {
    const { cartProducts } = this.state;
    const product = cartProducts.find((item) => item.product.id === selectedProduct.id);
    const indexOfProduct = cartProducts
      .findIndex((item) => item.product.id === selectedProduct.id);
    const newArray = [...cartProducts];
    if (operator === 'minus' && product.quantity > 1) {
      product.quantity -= 1;
    } else if (operator === 'plus'
      && product.quantity < selectedProduct.available_quantity) {
      product.quantity += 1;
    }
    newArray[indexOfProduct] = product;
    this.setState({
      cartProducts: newArray,
    });
  };

  render() {
    const { cartProducts } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Link
            to="/shopping-cart"
          >
            <CartButton productList={ cartProducts } />
          </Link>
          <Routes
            addCart={ this.addCart }
            removeFromCart={ this.removeFromCart }
            handleQuantityChange={ this.handleQuantityChange }
            cartProducts={ cartProducts }
          />
        </header>
      </div>
    );
  }
}

export default App;
