import React from 'react';
import { shallow } from 'enzyme';
import RatingFilter from '../RatingFilter';
import PrettyRating from '../PrettyRating';

describe('<RatingFilter /> component', () => {
  // Create the createWrapper function that will shallow render the component
  // based on the functions arguments.
  beforeEach(function () {
    this.event = {
      target: {
        getAttribute: () => 'someID'
      }
    };
    this.createWrapper = (addFilter = () => null) => {
      this.wrapper = shallow((
        <RatingFilter addFilter={addFilter} />
      ));
    };
  });


  it('should render the PrettyRating component', function () {
    // Mount the component with test movie data.
    this.createWrapper();
    // Should render React element with .pretty-rating class.
    expect(this.wrapper.find(PrettyRating).length).toBe(1);
  });

  it('should render the correct classes', function () {
    // Mount the component with test movie data.
    this.createWrapper();
    // Should render React element with .pretty-rating class.
    expect(this.wrapper.find('.rating-filter').length).toBe(1);
  });

  it('should render checkbox to enable filter', function () {
    // Mount the component with test movie data.
    this.createWrapper();
    // Should render React checkbox with correct class.
    expect(this.wrapper.find('.rating-filter__input').length).toBe(1);
    expect(this.wrapper.find('.rating-filter__label').length).toBe(1);
  });


  it('method handleCheckboxClick executes properly', function () {
    // Mount the component.
    this.createWrapper();
    // State enabled should be false.
    expect(this.wrapper.state('enabled')).toBe(false);
    // Get the instance and call handleCheckboxClick method.
    this.wrapper.instance().handleCheckboxClick({
      target: {
        checked: true
      }
    });
    // Should change the state correctly
    expect(this.wrapper.state('enabled')).toBe(true);
    // The checkbox is unchecked.
    this.wrapper.instance().handleCheckboxClick({
      target: {
        checked: false
      }
    });
    // Should change the state correctly
    expect(this.wrapper.state('enabled')).toBe(false);
  });

  it('method handleIncrement executes properly', function () {
    // Create a spy for addFilter.
    const addFilterSpy = jasmine.createSpy('addFilter');
    // Mount the component.
    this.createWrapper(addFilterSpy);
    // State enabled should be false.
    expect(this.wrapper.state('enabled')).toBe(false);
    this.wrapper.setState({ enabled: true });
    // Get the instance and call handleCheckboxClick method.
    this.wrapper.instance().handleIncrement(this.event);
    // Should change the state correctly
    expect(this.wrapper.state('rating')).toBe(3.5);
    this.wrapper.instance().handleIncrement(this.event);
    // Should change the state correctly
    expect(this.wrapper.state('rating')).toBe(4);
    // State rating is maximum, dont do anything;
    this.wrapper.setState({ rating: 10 });
    this.wrapper.instance().handleIncrement(this.event);
    expect(this.wrapper.state('rating')).toBe(10);
    // The addFilter spy should have been called.
    expect(addFilterSpy).toHaveBeenCalledWith(4, 'pretty-rating__input', false);
  });

  it('method handleDecrement executes properly', function () {
    // Create a spy for addFilter.
    const addFilterSpy = jasmine.createSpy('addFilter');
    // Mount the component.
    this.createWrapper(addFilterSpy);
    // State enabled should be false.
    expect(this.wrapper.state('enabled')).toBe(false);
    this.wrapper.setState({ enabled: true });
    // Get the instance and call handleCheckboxClick method.
    this.wrapper.instance().handleDecrement();
    // Should change the state correctly
    expect(this.wrapper.state('rating')).toBe(2.5);
    this.wrapper.instance().handleDecrement();
    // Should change the state correctly
    expect(this.wrapper.state('rating')).toBe(2);
    // State rating is minimum, dont do anything;
    this.wrapper.setState({ rating: 0 });
    this.wrapper.instance().handleDecrement();
    expect(this.wrapper.state('rating')).toBe(0);
    expect(addFilterSpy).toHaveBeenCalledWith(2, 'pretty-rating__input', false);
  });
});
