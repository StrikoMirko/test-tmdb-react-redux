import React from 'react';
import MoviesListContainer from './containers/MoviesListContainer';
import FiltersContainer from './containers/FiltersContainer';

/**
 * Main app.
 */
const App = () => {
  return (
    <div className="movie-app">
      <FiltersContainer />
      <MoviesListContainer />
    </div>
  );
};

export default App;
