import cloneDeep from 'lodash/cloneDeep';
import config from '../../config';

export default class ApiDataNormaliser {
  /**
   * Normalises the movie genres response data.
   * @param {object} genres
   *
   * @returns {array} normalised genres array.
   */
  static normaliseMovieGenres(genres) {
    return genres.genres;
  }

  /**
   * Normalises the movie list response data.
   * @param {object} movies
   *
   * @returns {array} normalised movies array.
   */
  static normaliseMovies(movies) {
    return movies.results.map(v => {
      return {
        id: v.id,
        average_vote: v.vote_average,
        title: v.title,
        popularity: v.popularity,
        image: `${config.imageApiUrl}${v.poster_path}`,
        genre_ids: v.genre_ids,
        summary: v.overview,
      };
    });
  }

  /**
   * Consolidates the movie list genre_ids field with genres.
   * @param {array} movies,
   * @param {array} genres
   *
   * @returns {object} new movies array
   */
  static consolidateMoviesGenres(movies, genres) {
    // Return a new array with the properly mapped and filtered genres in movies.
    // Clone the movies array first.
    const dupeMovies = cloneDeep(movies);
    return dupeMovies.map(v => {
      v.genre_ids = v.genre_ids.map(gid => { // eslint-disable-line no-param-reassign
        return genres.filter(g => g.id === gid).pop();
      });
      return v;
    });
  }
}
