import * as actions from '../genres';
// Import test data.
import testResponseData from '../../helpers/testData/responseData';

describe('Genres list action creator', () => {
  it('load genres', () => {
    // Create LOAD_MOVIE_GENRES action and compare
    // with expected action.
    const action = actions.loadMovieGenres(testResponseData.genreListTestData.genres);
    const expectedAction = {
      type: actions.LOAD_MOVIE_GENRES,
      genres: testResponseData.genreListTestData.genres
    };
    expect(action).toEqual(expectedAction);
  });

  it('creates a genres list thunk action', () => {
    // Check if fetchMovieGenres thunk exists.
    // @Todo: Find a way to test this thunk.
    const action = actions.fetchMovieGenres();
    expect(typeof action).toEqual('function');
  });
});
