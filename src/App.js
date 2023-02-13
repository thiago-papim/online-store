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
    this.setState({ cartProducts: [...cartProducts, product] }, () => {
    });
  };

  removeFromCart = (itemId) => {
    console.log(itemId);
    const { cartProducts } = this.state;
    const updatedItems = cartProducts.filter((item) => {
      console.log(item.id);
      return item.id !== itemId;
    });
    console.log(updatedItems);
    this.setState({ cartProducts: updatedItems });
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  render() {
    const { cartProducts } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Link
            to={ {
              pathname: '/shopping-cart',
              state: {
                cartProducts,
              },
            } }
          >
            <CartButton productList={ cartProducts } />
          </Link>
          <Routes
            addCart={ this.addCart }
            removeFromCart={ this.removeFromCart }
            cartProducts={ cartProducts }
          />
        </header>
      </div>
    );
  }
}

export default App;
