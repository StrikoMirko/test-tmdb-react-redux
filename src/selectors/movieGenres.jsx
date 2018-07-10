import { createSelector } from 'reselect';
import ApiDataNormaliser from '../helpers/ApiDataNormaliser';

const getMovies = state => state.movies;
const getGenres = state => state.genres;
const getGenresInMovies = createSelector(
  [getMovies, getGenres],
  (movies, genres) => {
    if (!genres.length) {
      return movies;
    }
    return ApiDataNormaliser.consolidateMoviesGenres(movies, genres);
  }
);

export default getGenresInMovies;
