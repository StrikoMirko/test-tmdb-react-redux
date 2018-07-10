import { LOAD_MOVIE_GENRES } from '../../actions/genres';
import reducer from '../genres';
// Get the test response data.
import testResponseData from '../../helpers/testData/responseData';

describe('Genres reducer', () => {
  it('Returns initial state', () => {
    // Should return default state.
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('Load genres state', () => {
    // Reducer should return proper data for this action.
    const action = {
      type: LOAD_MOVIE_GENRES,
      genres: testResponseData.genreListTestData.genres
    };
    expect(reducer([], action)).toEqual(testResponseData.genreListTestData.genres);
  });
});
