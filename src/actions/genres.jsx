import ApiConnector from '../helpers/ApiConnector';

// Export the action definitions.
export const FETCH_MOVIE_GENRES = 'FETCH_MOVIE_GENRES';
export const LOAD_MOVIE_GENRES = 'LOAD_MOVIE_GENRES';

/**
 * Load the genres action.
 *
 * @param {array} genres
 *
 * @returns {object} action
 */
export function loadMovieGenres(genres) {
  return {
    type: LOAD_MOVIE_GENRES,
    genres,
  };
}

/**
 * Fetch genres thunk action.
 *
 * @returns {function} dispatched loadMovieGenres method
 */
export function fetchMovieGenres() {
  return async (dispatch) => {
    // Dispatch the FETCH_MOVIE_GENRES action.
    dispatch({ type: FETCH_MOVIE_GENRES });
    // Get genres list and dispatch the
    // loadMovieGenres action with that genres list.
    try {
      const genres = await ApiConnector.getGenreList();
      dispatch(loadMovieGenres(genres));
      return genres;
    } catch (error) {
      throw new Error(`Unable to fetch movies: ${error}`);
    }
  };
}
