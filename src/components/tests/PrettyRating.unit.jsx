import React from 'react';
import { shallow } from 'enzyme';
import PrettyRating from '../PrettyRating';

describe('<PrettyRating /> component', () => {
  // Create the createWrapper function that will shallow render the component
  // based on the functions arguments.
  beforeEach(function () {
    this.createWrapper = (props) => {
      this.wrapper = shallow((
        <PrettyRating {...props} />
      ));
    };
  });

  it('should render the correct classes', function () {
    // Mount the component.
    this.createWrapper();
    // Should render React element with .pretty-rating class.
    expect(this.wrapper.find('.pretty-rating').length).toBe(1);
  });

  it('should render buttons and a number box', function () {
    // Mount the component.
    this.createWrapper();
    // Should render React elements buttons and input with correct classes.
    const buttons = this.wrapper.render().find('.pretty-rating > button');
    const textbox = this.wrapper.render().find('.pretty-rating > input');
    expect(buttons.length).toBe(2);
    expect(buttons.hasClass('pretty-rating__button')).toBe(true);
    expect(buttons.eq(1).hasClass('pretty-rating__button--increment')).toBe(true);
    expect(buttons.eq(0).hasClass('pretty-rating__button--decrement')).toBe(true);
    // Check the input.
    expect(textbox.length).toBe(1);
    expect(textbox.hasClass('pretty-rating__input')).toBe(true);
    expect(textbox.attr('type')).toBe('number');
  });

  it('test props', function () {
    // Create spies that will try to execute.
    const onIncrementSpy = jasmine.createSpy('onIncrement');
    const onDecrementSpy = jasmine.createSpy('onDecrement');
    const props = {
      increment: 5,
      rating: 10,
      onIncrement: onIncrementSpy,
      onDecrement: onDecrementSpy,
      disabled: true
    };
    // Mount the component with correct props.
    this.createWrapper(props);
    const buttons = this.wrapper.find('.pretty-rating__button');
    const textbox = this.wrapper.find('.pretty-rating > input');
    // Check the onIncrement callback is fired.
    buttons.at(0).simulate('click')
    expect(onDecrementSpy).toHaveBeenCalled();
    // Check the onDecrement callback is fired.
    buttons.at(1).simulate('click')
    expect(onIncrementSpy).toHaveBeenCalled();
    // Textbox has the right attributes.
    expect(textbox.render().attr('data-increment')).toBe('5');
    expect(textbox.render().val()).toBe('10');
  });
});
