import React from 'react';
import Sidebar from '../components/Sidebar';

class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

export default Home;
