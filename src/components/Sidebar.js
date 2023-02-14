import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';
import '../styles/sidebar.css';

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
  };

  render() {
    const { categories } = this.state;
    const { handle } = this.props;
    return (
      <ul className="categorias">
        <h3>Categorias</h3>
        {categories.map((categorie) => (
          <label
            data-testid="category"
            htmlFor={ categorie.id }
            key={ categorie.id }
          >
            <div className="input-category">
              <input
                type="radio"
                id={ categorie.id }
                name="Categorias"
                onChange={ handle }
              />
              <li>{categorie.name}</li>
            </div>
          </label>
        ))}
      </ul>
    );
  }
}

Sidebar.propTypes = {
  handle: PropTypes.func.isRequired,
};

export default Sidebar;
