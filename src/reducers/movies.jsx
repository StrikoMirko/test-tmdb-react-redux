// Get the proper action definitions and inital state.
import { LOAD_MOVIES } from '../actions/movies';
import initialState from './initialState';

export default (state = initialState.movies, action) => {
  switch (action.type) {
    case LOAD_MOVIES: {
      // If movies are not there return error else return movies
      // with all and filtered list same.
      const movies = [...action.movies];
      if (!movies) {
        throw Error('Could not load movies');
      }
      // Replace the movie image with the full path.
      return movies.sort((a, b) => b.popularity - a.popularity);
    }
    default:
      return state;
  }
};
