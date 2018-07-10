import axios from 'axios';
import config from '../../config';
import ApiDataNormaliser from './ApiDataNormaliser';

export const ENDPOINT_GENRE_LIST = 'ENDPOINT_GENRE_LIST';
export const ENDPOINT_MOVIE_LIST = 'ENDPOINT_MOVIE_LIST';

class ApiConnector {
  /**
   * Returns a properly formed endpoint.
   *
   * @param {string} endpoint
   * @param {number} page
   *
   * @returns {string} full endpoint
   */
  static getEndpoint(endpoint, page = 1) {
    switch (endpoint) {
      case ENDPOINT_GENRE_LIST:
        return `/genre/movie/list?api_key=${config.apiAccessToken}&language=${config.apiLanguage}`;

      case ENDPOINT_MOVIE_LIST:
        return `/movie/now_playing?api_key=${config.apiAccessToken}&language=${config.apiLanguage}&page=${page}`;

      default:
        return '';
    }
  }

  /**
   * Request defaults for axios.
   *
   * @returns {object} deafults for axios request.
   */
  static getRequestDefaults() {
    return {
      method: 'get',
      baseURL: config.apiUrl,
      url: '/',
      data: null,
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      }
    };
  }

  /**
   * Call an endpoint, with optional request overrides.
   *
   * @param {string} endpoint
   * @param {object} requestOverride
   *
   * @returns {object} axios response object.
   */
  static call = async (endpoint, requestOverride = {}) => {
    // Request options.
    const request = {
      ...ApiConnector.getRequestDefaults(),
      ...requestOverride,
      url: endpoint,
    };
    // Get the response and return it, else throw error.
    try {
      const response = await axios(request).then(r => r);
      return response;
    } catch (error) {
      throw new Error(`Unable to execute the axios request:${error}`);
    }
  }

  /**
   * Get genre list.
   *
   * @returns {array} list of genres.
   */
  static getGenreList = async () => {
    try {
      const response = await ApiConnector.call(ApiConnector.getEndpoint(ENDPOINT_GENRE_LIST));
      return ApiDataNormaliser.normaliseMovieGenres(response.data);
    } catch (error) {
      throw new Error('Problems in getting the genre list');
    }
  };

  /**
   * Get list of movies.
   *
   * @returns {array} list of movies
   */
  static getMovieList = async (page = 1) => {
    try {
      const response = await ApiConnector.call(ApiConnector.getEndpoint(ENDPOINT_MOVIE_LIST, page));
      return ApiDataNormaliser.normaliseMovies(response.data);
    } catch (error) {
      throw new Error('Problems in getting the list of movies');
    }
  };
}

export default ApiConnector;
