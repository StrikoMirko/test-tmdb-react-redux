import ApiConnector from '../helpers/ApiConnector';
import ApiDataNormaliser from '../helpers/ApiDataNormaliser';

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const LOAD_MOVIES = 'LOAD_MOVIES';

/**
 * Load the movies action.
 *
 * @param {array} movies
 *
 * @returns {object} action
 */
export function loadMovies(movies) {
  return {
    type: LOAD_MOVIES,
    movies,
  };
}

/**
 * Fetch movies thunk action.
 *
 * @param {number} page
 *
 * @returns {function} dispatched loadMovies method
 */
export function fetchMovies(page = 1) {
  return async (dispatch, getState) => {
    // Dispatch the FETCH_MOVIES action.
    dispatch({ type: FETCH_MOVIES });
    // Get the movie list and dispatch loadMovies
    // action with that movie list.
    try {
      const movies = await ApiConnector.getMovieList(page);
      const genresInMovies = ApiDataNormaliser.consolidateMoviesGenres(movies, getState().genres);
      dispatch(loadMovies(genresInMovies));
      return movies;
    } catch (error) {
      throw new Error(`Unable to fetch movies: ${error}`);
    }
  };
}
