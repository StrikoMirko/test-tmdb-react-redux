import ApiDataNormaliser from '../ApiDataNormaliser';
import testResponseData from '../testData/responseData';
import testNormalisedResponseData from '../testData/normalisedResponseData';

describe('ApiDataNormaliser helper', () => {
  it('normalises the genres response data', () => {
    // The response data is correctly normalised.
    expect(
      ApiDataNormaliser.normaliseMovieGenres(testResponseData.genreListTestData)
    ).toEqual(testNormalisedResponseData.normalisedGenreListTestData);
  });

  it('normalises the movies response data', () => {
    // The response data is correctly normalised.
    expect(
      ApiDataNormaliser.normaliseMovies(testResponseData.movieListTestData)
    ).toEqual(testNormalisedResponseData.normalisedMovieListTestData);
  });

  it('consolidates the movies response data with movie genres', () => {
    // The response data is correctly normalised.
    expect(
      ApiDataNormaliser.consolidateMoviesGenres(
        testNormalisedResponseData.normalisedMovieListTestData,
        testNormalisedResponseData.normalisedGenreListTestData
      )
    ).toEqual(testNormalisedResponseData.consolidatedMovieListTestData);
  });
});
