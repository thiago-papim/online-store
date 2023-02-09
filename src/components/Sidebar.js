import React from 'react';
import { getCategories } from '../services/api';

class Sidebar extends React.Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.handleCategories();
  }

  handleCategories = async () => {
    const response = await getCategories();
    this.setState({
      categories: response,
    });
    console.log(response);
  };

  render() {
    const { categories } = this.state;
    return (
      <div>
        <h3>Categorias</h3>
        {categories.map((categorie) => (
          <label
            data-testid="category"
            htmlFor={ categorie.id }
            key={ categorie.id }
          >
            <input
              type="radio"
              id={ categorie.id }

            />
            <span>{categorie.name}</span>
          </label>
        ))}
      </div>
    );
  }
}

export default Sidebar;
