import { ADD_FILTER, REMOVE_FILTER } from '../../actions/filters';
import reducer from '../filters';

describe('Filters reducer', () => {
  it('Returns initial state', () => {
    // Should return default state.
    expect(reducer(undefined, {})).toEqual({});
  });

  it('Add filter', () => {
    // Reducer should return proper data for this action.
    const filerFunction1 = (a) => a;
    const filerFunction2 = (a) => a;
    const filter = {
      'RegiteredComponent': {
        func1: filerFunction1
      }
    };
    const action = {
      type: ADD_FILTER,
      filter
    };
    expect(reducer({}, action)).toEqual(filter);
    // Add a filter if something is already there.
    const existingFilter = {
      'RegiteredComponent': {
        func2: filerFunction2
      }
    };
    expect(reducer(existingFilter, action)).toEqual({
      'RegiteredComponent': {
        func2: filerFunction2,
        func1: filerFunction1
      }
    });
  });

  it('Remove filter', () => {
    // Define the filter to remove.
    const filerFunction1 = (a) => a;
    const filerFunction2 = (a) => a;
    const filter = {
      'RegiteredComponent': {
        func1: filerFunction1
      }
    };
    const action = {
      type: REMOVE_FILTER,
      filter
    };
    // Mock existing filters.
    const existingFilters = {
      'RegiteredComponent': {
        func2: filerFunction2,
        func1: filerFunction1
      }
    };
    // Check taht the reducer removed the right filter.
    expect(reducer(existingFilters, action)).toEqual({
      'RegiteredComponent': {
        func2: filerFunction2
      }
    });
    // Mock existing filters.
    const oneMoreLeft = {
      'RegiteredComponent': {
        func1: filerFunction1
      }
    };
    // When there is no more filterFunctions to remove
    // remove the component key.
    expect(reducer(oneMoreLeft, action)).toEqual({});
  });
});
