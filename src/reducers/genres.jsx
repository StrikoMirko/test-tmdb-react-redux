// Get the proper action definitions and initial state.
import { LOAD_MOVIE_GENRES } from '../actions/genres';
import initialState from './initialState';

export default (state = initialState.genres, action) => {
  switch (action.type) {
    case LOAD_MOVIE_GENRES: {
      // If genres are not there return error else return genres.
      if (!action.genres) {
        throw Error('Could not load genres');
      }
      return action.genres;
    }
    default:
      return state;
  }
};
