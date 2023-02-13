import { React, Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Review extends Component {
  state = {
    email: '',
    rating: '',
    errorMessage: '',
    text: '',
    submittedData: [],
  };

  componentDidMount() {
    this.getReviews();
  }

  getReviews = () => {
    const { match: { params: { id } } } = this.props;
    const ratings = JSON.parse(window.localStorage.getItem(`${id}`)) || [];
    this.setState({ submittedData: ratings });
  };

  handleClick = () => {
    const { email, rating, text, submittedData } = this.state;
    if (!email || !rating) {
      this.setState({ errorMessage: 'Campos inválidos' });
      return;
    }
    if (email.length > 0 || rating) this.setState({ errorMessage: '' });
    const { match: { params: { id } } } = this.props;
    const formData = {
      email,
      rating,
      text,
    };
    const updatedData = [...submittedData, formData];
    this.setState({ submittedData: updatedData, email: '', rating: '', text: '' });
    window.localStorage.setItem(`${id}`, JSON.stringify(updatedData));
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value, errorMessage: '' });
  };

  renderSubmittedData = () => {
    const { submittedData } = this.state;
    return submittedData.map((data, index) => (
      <div key={ `${data.email}-${index}` }>
        <p data-testid="review-card-email">{ data.email }</p>
        <p data-testid="review-card-rating">{ data.rating }</p>
        <p data-testid="review-card-evaluation">{ data.text }</p>
      </div>
    ));
  };

  render() {
    const {
      email, rating, errorMessage, text, submittedData,
    } = this.state;

    return (
      <>
        <h3>Avaliações</h3>
        <section>
          <form>
            <label htmlFor="email">
              E-mail:
              <input
                id="email"
                type="email"
                data-testid="product-detail-email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="rating">
              Nota:
              {
                ['1', '2', '3', '4', '5'].map((e) => (<input
                  name="rating"
                  type="radio"
                  key={ e }
                  data-testid={ `${e}-rating` }
                  value={ e }
                  checked={ rating === { e } }
                  onChange={ this.handleChange }
                />))
              }
            </label>
            <label htmlFor="evaluation">
              Comentários:
              <textarea
                id="evaluation"
                data-testid="product-detail-evaluation"
                name="text"
                value={ text }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="submit-review-btn"
              onClick={ this.handleClick }
            >
              Avaliar
            </button>
          </form>
          {errorMessage && <p data-testid="error-msg">{ errorMessage }</p>}
          {submittedData.length > 0 && (
            <section>
              {this.renderSubmittedData()}
            </section>
          )}
        </section>
      </>
    );
  }
}

Review.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(Review);
