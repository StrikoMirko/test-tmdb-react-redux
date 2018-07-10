import cloneDeep from 'lodash/cloneDeep';
import getGenresInMovies from '../movieGenres';
import testNormalisedResponseData from '../../helpers/testData/normalisedResponseData';

describe('movieGenres selectors', () => {
  it('should execute getGenresInMovies reselect properly', () => {
    // Set the state for the selector and define the expected state.
    const currentState = {
      movies: testNormalisedResponseData.normalisedMovieListTestData,
      genres: testNormalisedResponseData.normalisedGenreListTestData
    };
    // Movies need to be sorted by popularity.
    // const sortedMoviesList = cloneDeep(testNormalisedResponseData);
    // expect(getGenresInMovies(currentState)).toEqual(sortedMoviesList.consolidatedMovieListTestData.sort((a, b) => b.popularity - a.popularity));
  });
});
