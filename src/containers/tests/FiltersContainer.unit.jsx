import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { shallow } from 'enzyme';

import { ADD_FILTER, REMOVE_FILTER } from '../../actions/filters';
import FiltersContainer from '../FiltersContainer';
import CheckBoxList from '../../components/CheckBoxList';
import RatingFilter from '../../components/RatingFilter';

import testNormalisedData from '../../helpers/testData/normalisedResponseData';

describe('<FiltersContainer /> container', () => {
  // Create the createWrapper function that will shallow render the component
  // based on the functions arguments.
  beforeEach(function () {
    this.dummyFilters = {
      'RegisteredComponent1': {
        func1: (a) => a,
        func2: (a) => a
      },
      'RegisteredComponent2': {
        func1: (a) => a
      }
    };
    // Dummy event to be used for this component.
    this.dummyEvent = (checked = 1) => {
      return {
        target: {
          getAttribute: (attr) => {
            switch (attr) {
              case 'id':
                return `checkfilter-1`;
              case 'data-genre':
                return 1;
            }
          },
          checked
        }
      }
    };

    this.createWrapper = (stateOverride = {}, propsOverrides = {}) => {
      // Set initialState by default and possibly override state.
      const state = {
        filters: this.dummyFilters,
        ...stateOverride
      };
      // Create a reduxMockStore.
      this.store = createMockStore(state);
      // Shallow render the component on this.wrapper variable and dive 1 level.
      this.wrapper = shallow(<FiltersContainer {...propsOverrides} />, { context: { store: this.store } }).dive();
    };
  });

  it('renders CheckBoxList component with right props', function () {
    // Shallow render the component with some state.
    this.createWrapper({
      genres: testNormalisedData.normalisedGenreListTestData
    });
    // Check to see that the MovieList rendered and
    // it took the right props from the state.
    expect(this.wrapper.find(CheckBoxList).length).toBe(1);
    expect(this.wrapper.find(CheckBoxList).props()).toEqual({
      items: testNormalisedData.normalisedGenreListTestData,
      onClick: this.wrapper.instance().handleCheckboxClick
    });
  });

  it('renders RatingFilter component with right props', function () {
    // Shallow render the component with some state.
    this.createWrapper({
      genres: testNormalisedData.normalisedGenreListTestData
    });
    // Check to see that the MovieList rendered and
    // it took the right props from the state.
    expect(this.wrapper.find(RatingFilter).length).toBe(1);
    expect(this.wrapper.find(RatingFilter).props()).toEqual({
      addFilter: this.wrapper.instance().handleVoteFilterChange,
      increment: 0.5
    });
  });

  it('handleCheckboxClick method fires off correct actions', function () {
    const checkedEvent = this.dummyEvent();
    // Shallow render the component with some state.
    this.createWrapper();
    // No actions dispatched.
    expect(this.store.getActions()).toEqual([]);
    // Get the instance and call the handleCheckboxClick method.
    this.wrapper.instance().handleCheckboxClick(checkedEvent);
    expect(this.store.getActions()[0].type).toEqual(ADD_FILTER);

    // Execute the remove fitler action.
    const unCheckedEvent = this.dummyEvent(0);
    this.wrapper.instance().handleCheckboxClick(unCheckedEvent);
    expect(this.store.getActions()[1].type).toEqual(REMOVE_FILTER);
  });

  it('method getExistingFilters works properly', function () {
    // Shallow render the component with some state.
    this.createWrapper();
    // Get the instance and test the getExistingFilters method.
    expect(this.wrapper.instance().getExistingFilters('RegisteredComponent1'))
      .toEqual(this.dummyFilters['RegisteredComponent1']);
  });

  it('method generateCheckboxFilter works properly', function () {
    // Shallow render the component with some state.
    this.createWrapper();
    // Get the instance and test the generateCheckboxFilter method.
    const filter = this.wrapper.instance().generateCheckboxFilter('func1', 1);
    // The filter should contain the correct keys
    expect(Object.keys(filter).join()).toEqual('CheckBoxList');
    expect(Object.keys(filter['CheckBoxList']).join()).toEqual('func1');
  });

  it('method generateVotingFilter works properly', function () {
    // Shallow render the component with some state.
    this.createWrapper();
    // Get the instance and test the generateCheckboxFilter method.
    const filter = this.wrapper.instance().generateVotingFilter('func1', 3);
    // The filter should contain the correct keys
    expect(Object.keys(filter).join()).toEqual('RatingFilter');
    expect(Object.keys(filter['RatingFilter']).join()).toEqual('func1');
  });
});
