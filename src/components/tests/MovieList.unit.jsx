import React from 'react';
import { shallow } from 'enzyme';
import MovieList from '../MovieList';
import testNormalisedResponseData from '../../helpers/testData/normalisedResponseData';

describe('<MovieList /> component', () => {
  // Create the createWrapper function that will shallow render the component
  // based on the functions arguments.
  beforeEach(function () {
    this.createWrapper = (items = [], columns = 3) => {
      this.wrapper = shallow((
        <MovieList items={items} columns={columns} />
      ));
    };
  });


  it('should render the corerct grid classes', function () {
    // Mount the component with test movie data.
    this.createWrapper(testNormalisedResponseData.consolidatedMovieListTestData);
    // Should render 3 items with col-4 class.
    expect(this.wrapper.find('.col-4').length).toBe(3);
    // Mount the component with test movie data and different column number.
    this.createWrapper(testNormalisedResponseData.consolidatedMovieListTestData, 4);
    // Should render 4 items with col-3 class.
    expect(this.wrapper.find('.col-3').length).toBe(3);
  });

  it('should render the correct data', function () {
    // Mount the component with test movie data.
    this.createWrapper(testNormalisedResponseData.consolidatedMovieListTestData);
    const firstMovie = this.wrapper.find('.movie-li').at(0);
    const secondMovie = this.wrapper.find('.movie-li').at(1);
    expect(firstMovie.render().find('img').attr('src')).toBe('https://image.tmdb.org/t/p/w500/poster1.jpg');
    expect(firstMovie.render().find('h3').text()).toBe('Test 1 (Tha Bomb, Funny haha)');

  });

});
