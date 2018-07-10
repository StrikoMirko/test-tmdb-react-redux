import { LOAD_MOVIES } from '../../actions/movies';
import reducer from '../movies';
// Get the test response data.
import testNormalisedResponseData from '../../helpers/testData/normalisedResponseData';

describe('Movies reducer', () => {
  it('Returns initial state', () => {
    // Should return default state.
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('Load movies state', () => {
    // Reducer should return proper data for this action.
    const action = {
      type: LOAD_MOVIES,
      movies: testNormalisedResponseData.normalisedMovieListTestData
    };
    // Movies need to be sorted by popularity.
    const sortedMoviesList = [...testNormalisedResponseData.normalisedMovieListTestData];
    expect(reducer([], action)).toEqual(sortedMoviesList.sort((a, b) => b.popularity - a.popularity));
  });
});
