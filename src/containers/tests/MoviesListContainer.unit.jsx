import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { shallow } from 'enzyme';

import MoviesListContainer from '../MoviesListContainer';
import MovieList from '../../components/MovieList';

import initialState from '../../reducers/initialState';
import testNormalisedData from '../../helpers/testData/normalisedResponseData';

describe('<MoviesListContainer /> container', () => {
  // Create the createWrapper function that will shallow render the component
  // based on the functions arguments.
  beforeEach(function () {
    this.createWrapper = (stateOverride = {}, propsOverrides = {}) => {
      // Set initialState by default and possibly override state.
      const state = {
        genres: testNormalisedData.normalisedGenreListTestData,
        movies: testNormalisedData.consolidatedMovieListTestData,
        ...stateOverride
      };
      // Create a reduxMockStore.
      this.store = createMockStore(state);
      // Shallow render the component on this.wrapper variable and dive 1 level.
      this.wrapper = shallow(<MoviesListContainer {...propsOverrides} />, { context: { store: this.store } }).dive();
    };
  });
  it('renders MovieList component with right props', function () {
    // Shallow render the component with some state.
    this.createWrapper();
    // Check to see that the MovieList rendered and
    // it took the right props from the state.
    expect(this.wrapper.find(MovieList).length).toBe(1);
    expect(this.wrapper.find(MovieList).props()).toEqual({
      items: testNormalisedData.consolidatedMovieListTestData,
      columns: 3
    });
  });

  it('displays results based on the filters', function () {
    const filters = {
      SomeStrangeComponent: {
        filter1: (movies) => {
          return movies.filter(v => {
            return v.genre_ids.filter(g => g.id === 3).length;
          });
        },
        filter2: (movies) => {
          return movies.filter(v => {
            return v.genre_ids.filter(g => g.id === 2).length;
          });
        }
      }
    };
    // Shallow render the component with some state.
    this.createWrapper({
      filters
    });
    // Check to see that the movies get filtered properly.
    const instance = this.wrapper.instance();
    const result = instance.filterMovies(
      testNormalisedData.consolidatedMovieListTestData,
      filters
    );
    expect(result).toEqual([
      testNormalisedData.consolidatedMovieListTestData[1]
    ]);
  });

  it('calls the proper action creators on mounting', function () {
    // Create spies that will have to fire off on component mounting.
    const fetchMoviesSpy = jasmine.createSpy('fetchMovies');
    const fetchMovieGenresSpy = jasmine.createSpy('fetchMovieGenres');
    // Define the props to override so we can test teh spies.
    // Property names are here essential, they must match.
    const props = {
      genresActions: {
        fetchMovieGenres: fetchMovieGenresSpy
      },
      moviesActions: {
        fetchMovies: fetchMoviesSpy
      }
    };
    this.createWrapper(initialState, props);
    // When teh component is rendered the spies above must execute.
    expect(fetchMoviesSpy).toHaveBeenCalled();
    expect(fetchMovieGenresSpy).toHaveBeenCalled();
  });
});
