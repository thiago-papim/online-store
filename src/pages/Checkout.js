import PropTypes from 'prop-types';
import React from 'react';

export default class Checkout extends React.Component {
  state = {
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    isValid: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSUbmit = (event) => {
    const { isValid, ...inputs } = this.state;
    const { history } = this.props;
    event.preventDefault();
    const validation = Object.values(inputs).every((value) => value.length > 0);
    this.setState({ isValid: validation });
    if (validation) {
      localStorage.clear();
      this.setState({
        fullname: '',
        email: '',
        cpf: '',
        phone: '',
        cep: '',
        address: '',
        payment: '',
        isValid: false,
      });
      history.push('/');
    }
  };

  render() {
    const { fullname, email, cpf, phone, cep, address, isValid, payment } = this.state;

    const { cartProducts } = this.props;
    let cartObjects = null;
    if (cartProducts) {
      const productsID = cartProducts.map(({ id }) => id);
      const productsUniqueIDs = new Set(productsID);
      cartObjects = Array.from(productsUniqueIDs)
        .map((id) => cartProducts.filter(({ id: compareID }) => id === compareID))
        .map((array) => {
          array[0].count = array.length;
          return array[0];
        });
    }
    return (
      <main>
        <section>
          {cartObjects?.map((object) => (
            <div key={ object.id }>{object.title}</div>
          ))}
        </section>
        <form>
          <label htmlFor="checkout-fullname">
            Nome Completo
            <input
              value={ fullname }
              name="fullname"
              id="checkout-fullname"
              data-testid="checkout-fullname"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-email">
            Email
            <input
              value={ email }
              name="email"
              id="checkout-email"
              data-testid="checkout-email"
              type="email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-cpf">
            CPF
            <input
              value={ cpf }
              name="cpf"
              id="checkout-cpf"
              data-testid="checkout-cpf"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-phone">
            Telefone
            <input
              value={ phone }
              name="phone"
              id="checkout-phone"
              data-testid="checkout-phone"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-cep">
            CEP
            <input
              value={ cep }
              name="cep"
              id="checkout-cep"
              data-testid="checkout-cep"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-address">
            Endereço
            <input
              value={ address }
              name="address"
              id="checkout-address"
              data-testid="checkout-address"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <fieldset value={ payment }>
            <label htmlFor="ticket">
              boleto
              <input
                name="payment"
                id="ticket"
                type="radio"
                data-testid="ticket-payment"
                value="ticket"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="visa">
              Visa
              <input
                name="payment"
                id="visa"
                type="radio"
                data-testid="visa-payment"
                value="visa"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="master">
              MasterCard
              <input
                name="payment"
                id="master"
                type="radio"
                data-testid="master-payment"
                value="master"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="elo">
              Elo
              <input
                name="payment"
                id="elo"
                type="radio"
                data-testid="elo-payment"
                value="elo"
                onChange={ this.handleChange }
              />
            </label>
          </fieldset>
          <button
            type="submit"
            data-testid="checkout-btn"
            onClick={ this.handleSUbmit }
          >
            Pagar
          </button>
          {isValid || <span data-testid="error-msg">Campos inválidos</span>}
        </form>
      </main>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  cartProducts: PropTypes.instanceOf(Array).isRequired,
};
