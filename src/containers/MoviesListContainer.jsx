import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as genres from '../actions/genres';
import * as movies from '../actions/movies';

import MovieList from '../components/MovieList';

const mapStateToProps = (state) => ({
  movies: state.movies,
  filters: state.filters,
  ...state,
});

const mapDispatchToProps = (dispatch, props) => ({
  genresActions: bindActionCreators(genres, dispatch),
  moviesActions: bindActionCreators(movies, dispatch),
  ...props,
});

/**
 * React container component for MovieList.
 */
class MoviesListContainer extends Component {
  /**
   * Before component mounts get the genres and movies from the API.
   */
  componentWillMount() {
    this.props.genresActions.fetchMovieGenres();
    this.props.moviesActions.fetchMovies();
  }

  /**
   * Gets the requested filter
   *
   * @param {array} moviesList
   * @param {object} filters
   *
   * @returns {array} filtered movies
   */
  filterMovies = (moviesList, filters) => {
    let result = [...moviesList];
    Object.keys(filters).forEach(component => {
      return Object.keys(this.props.filters[component]).forEach(fkey => {
        if (!result.length) {
          return [];
        }
        result = this.props.filters[component][fkey](result);
      });
    });
    return result;
  };

  render() {
    const moviesList = this.props.movies || [];
    const filters = this.props.filters || {};
    return (
      <div className="container">
        <MovieList items={this.filterMovies(moviesList, filters)} columns={3} />
      </div>
    );
  }
}

MoviesListContainer.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.object
  ),
  filters: PropTypes.object,
  genresActions: PropTypes.object,
  moviesActions: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesListContainer);
