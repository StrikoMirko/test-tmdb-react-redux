import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import MoviesListContainer from '../containers/MoviesListContainer'
import FiltersContainer from '../containers/FiltersContainer';

describe('<App /> component tests', () => {
  beforeEach(function () {
    this.createWrapper = () => {
      this.wrapper = shallow(
        <App />
      );
    };
  });

  it('should render MoviesListContainer', function () {
    this.createWrapper();
    expect(this.wrapper.find(MoviesListContainer).length).toBe(1);
  });

  it('should render FilterContainer', function () {
    this.createWrapper();
    expect(this.wrapper.find(FiltersContainer).length).toBe(1);
  });
});
