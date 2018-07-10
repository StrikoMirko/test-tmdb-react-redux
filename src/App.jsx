import React, { Component } from 'react';
import MoviesListContainer from './containers/MoviesListContainer';
import FiltersContainer from './containers/FiltersContainer';

const App = (props) => {
  return (
    <div className="movie-app">
      <FiltersContainer />
      <MoviesListContainer />
    </div>
  );
};

export default App;
