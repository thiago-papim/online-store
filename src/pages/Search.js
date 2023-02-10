import React from 'react';
import { getCategories } from '../services/api';

class Search extends React.Component {
  state = {
    search: '',
    categories: [],
    returnOfSearch: [],
    trigger: false,

  };

  async componentDidMount() {
    const categoriesArray = await getCategories();
    this.setState({
      categories: categoriesArray,
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  // função condicional para saber o que vai ser renderizado
  testCondition = () => {
    const { returnOfSearch, trigger } = this.state;
    return trigger && returnOfSearch.length > 0;
  };

  // função que pesquisa de acordo com texto escrito
  handleSearch = async () => {
    const { search } = this.state;
    const responseApi = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`);
    const dataJson = await responseApi.json();
    this.setState({ returnOfSearch: dataJson.results,
      trigger: true });
  };

  render() {
    const { search, returnOfSearch, categories } = this.state;

    return (
      <>
        <input
          data-testid="query-input"
          name="search"
          type="text"
          value={ search }
          onChange={ this.handleChange }
        />
        <button
          data-testid="query-button"
          onClick={ this.handleSearch }
        >
          Pesquisar

        </button>
        { this.testCondition() ? returnOfSearch.map((item) => (
          <div data-testid="product" key={ item.id }>
            <p>{item.title}</p>
            <img src={ item.thumbnail } alt="Foto do produto" />
            <p>
              {item.price}
              {' '}
              R$
            </p>

          </div>)) : <h1>Nenhum produto foi encontrado</h1>}
        <div>
          {
            categories.map((element) => (
              <label
                key={ element.id }
                htmlFor={ element.id }
                data-testid="category"
              >
                { element.name }
                <input
                  type="radio"
                  id={ element.id }
                />
              </label>
            ))
          }
        </div>
      </>
    );
  }
}
export default Search;
