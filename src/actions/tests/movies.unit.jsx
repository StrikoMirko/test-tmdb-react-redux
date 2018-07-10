import * as actions from '../movies';
import testResponseData from '../../helpers/testData/responseData';

describe('Movies list action creator', () => {
  it('load movies', () => {
    // Create LOAD_MOVIES action and comare with expected action.
    const action = actions.loadMovies(testResponseData.movieListTestData.results);
    const expectedAction = {
      type: actions.LOAD_MOVIES,
      movies: testResponseData.movieListTestData.results
    };
    expect(action).toEqual(expectedAction);
  });

  it('creates a movies list thunk action', () => {
    // Check if fetchMovies Thunk exists.
    // @Todo: Find a way to test this thunk.
    const action = actions.fetchMovies();
    expect(typeof action).toEqual('function');
  });
});
