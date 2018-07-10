// Combine all reducers and export them.
import { combineReducers } from 'redux';
import genres from './genres';
import movies from './movies';
import filters from './filters';

const reducers = combineReducers({
  genres,
  movies,
  filters
});

export default reducers;
