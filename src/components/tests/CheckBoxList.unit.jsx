import React from 'react';
import { shallow } from 'enzyme';
import CheckBoxList from '../CheckBoxList';
import testNormalisedResponseData from '../../helpers/testData/normalisedResponseData';

describe('<CheckboxList /> component', () => {
  // Create the createWrapper function that will shallow render the component
  // based on the functions arguments.
  beforeEach(function () {
    this.createWrapper = (items = [], props) => {
      this.wrapper = shallow((
        <CheckBoxList items={items} { ...props } />
      ));
    };
  });

  it('should render the correct number of inputs', function () {
    // Mount the component with test movie data.
    this.createWrapper(testNormalisedResponseData.normalisedGenreListTestData);
    // Should render 3 checkbox items.
    expect(this.wrapper.find('input').length).toBe(3);
  });

  it('should render the correct classes', function () {
    // Mount the component with test movie data.
    this.createWrapper(testNormalisedResponseData.normalisedGenreListTestData);
    // Render checkboxlist in cheerio wrapper.
    const checkboxList = this.wrapper.render();
    expect(checkboxList.find('.checkbox-li input').hasClass('checkbox-li__input')).toBe(true);
    expect(checkboxList.find('.checkbox-li > label').hasClass('checkbox-li__label')).toBe(true);
  });

  it('should fire off onClick prop function', function () {
    const clickSpy = jasmine.createSpy('clickSpy');
    // Mount the component with test movie data.
    this.createWrapper(testNormalisedResponseData.normalisedGenreListTestData, { onClick: clickSpy });
    // Simulate click.
    this.wrapper.find('input').at(0).simulate('click');
    // Spy should be called.
    expect(clickSpy).toHaveBeenCalled();
  });
});
