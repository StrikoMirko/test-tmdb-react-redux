import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {$it} from "async-await-jasmine";
import config from '../../../config';
import ApiConnector,
{
  ENDPOINT_GENRE_LIST,
  ENDPOINT_MOVIE_LIST
}
  from '../ApiConnector';

import testResponseData from '../testData/responseData';
import testNormalisedResponseData from '../testData/normalisedResponseData';

describe('ApiConnector helper', () => {
  it('generates the correct request defaults', () => {
    const requestOptions = {
      method: 'get',
      baseURL: config.apiUrl,
      url: '/',
      data: null,
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      }
    };
    // ApiConnector generates the correct request defaults.
    expect(ApiConnector.getRequestDefaults()).toEqual(requestOptions);
  });
  it('provides correct endpoints', () => {
    // Check if the ApiConnector returns the correct genres list endpoint.
    expect(ApiConnector.getEndpoint(ENDPOINT_GENRE_LIST)).toEqual(
      `/genre/movie/list?api_key=${config.apiAccessToken}&language=${config.apiLanguage}`
    );
    // Check if the ApiConnector returns the correct movie list endpoint.
    expect(ApiConnector.getEndpoint(ENDPOINT_MOVIE_LIST)).toEqual(
      `/movie/now_playing?api_key=${config.apiAccessToken}&language=${config.apiLanguage}&page=1`
    );
    // Correct movie list endpoint with page argument.
    expect(ApiConnector.getEndpoint(ENDPOINT_MOVIE_LIST, 4)).toEqual(
      `/movie/now_playing?api_key=${config.apiAccessToken}&language=${config.apiLanguage}&page=4`
    );
  });
  // Async/Await $it function from axios-mock-adapter.
  $it("executes the call method correctly", async () => {
    // Initialise the mockAdapter and define a dummyEndpoint.
    const dummyEndpoint = 'dummy/endpoint';
    const mockAdapter = new MockAdapter(axios);
    // Mock the dummy endpoint to test the call method.
    mockAdapter
      .onGet(dummyEndpoint)
      .reply(200, 'dummy response');
    // Create an axios request options.
    const expectedAxiosRequest = {
      ...ApiConnector.getRequestDefaults(),
      url: dummyEndpoint
    };
    // Here we want to test that the ApiConnector call method
    // return the expected response
    const response = await ApiConnector.call(dummyEndpoint);
    const expectedAxiosResponse = await axios(expectedAxiosRequest).then(r => r);
    expect(response).toEqual(expectedAxiosResponse);
  });

  $it("returns the genres list", async () => {
    const mockAdapter = new MockAdapter(axios);
    // Mock the fake ENDPOINT_GENRE_LIST endpoint with testData.
    mockAdapter
      .onGet(ApiConnector.getEndpoint(ENDPOINT_GENRE_LIST))
      .reply(200, testResponseData.genreListTestData);

    // The getGenreList method returns the correct test data.
    const genreList = await ApiConnector.getGenreList();
    expect(genreList).toEqual(testNormalisedResponseData.normalisedGenreListTestData);
  });

  $it("returns the movies list", async () => {
    const mockAdapter = new MockAdapter(axios);
    // Mock the fake ENDPOINT_MOVIE_LIST endpoint with testData.
    mockAdapter
      .onGet(ApiConnector.getEndpoint(ENDPOINT_MOVIE_LIST))
      .reply(200, testResponseData.movieListTestData);

    // The getMovieList method returns the correct test data.
    const genreList = await ApiConnector.getMovieList();
    expect(genreList).toEqual(testNormalisedResponseData.normalisedMovieListTestData);
  });
});
