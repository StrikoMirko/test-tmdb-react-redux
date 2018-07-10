import React from 'react';
import PropTypes from 'prop-types';

/**
 * Pure React component MovieList.
 */
const MovieList = (props) => {
  /**
   * Gets the correct grid class.
   * Possible values are 1, 2, 3, 4, 6.
   *
   * @param {number} columns
   *
   * @returns {string} grid class definition
   * @throws Will throw an error if the argument is not a possible value.
   */
  const getGridClass = (columns) => {
    if ([1, 2, 3, 4, 6].indexOf(columns) === -1) {
      return new Error('Incorrect column number! Possible values: 1, 2, 3, 4, 6');
    }

    return `col-${12 / columns}`;
  };

  /**
   * Generate the movie title based on the genres
   *
   * @param {object} movie
   *
   * @returns {string} title based on the movie genres
   */
  const generateMovieTitle = (movie) => {
    const genreAppendix = movie.genre_ids.length && movie.genre_ids.map(v => v.name).join(', ');

    return `${movie.title} (${genreAppendix})`;
  };

  /**
   * Renders teh correct JSX for each MovieList item.
   *
   * @param {object} item
   * @param {number} column
   *
   * @returns {object} JSX of each item.
   * @throws Will throw an error if the argument is not a possible value.
   */
  const renderItems = (item, column) => {
    return (
      <div className={getGridClass(column)} key={item.id}>
        <div className="movie-li">
          <img className="movie-li__poster" src={item.image} alt={generateMovieTitle(item)} />
          <h3 className="movie-li__title">{generateMovieTitle(item)}</h3>
        </div>
      </div>
    );
  };

  // Get the JSX for the items using renderItems function.
  const items = props.items.map(v => renderItems(v, props.columns));

  return (
    <div className="row">
      {items}
    </div>
  );
};

// Define the prop types.
MovieList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.number,
};

// Set the default props to be 4 column layout
// with empty items array.
MovieList.defaultProps = {
  items: [],
  columns: 4
};

export default MovieList;
