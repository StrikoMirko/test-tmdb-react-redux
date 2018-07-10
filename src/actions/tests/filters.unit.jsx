import * as actions from '../filters';

describe('Filter action creator', () => {
  it('adds a filter', () => {
    // Create ADD_FILTER action and compare
    // with expected action.
    const filter = {
      'RegisteringComponent': {
        func1: (a) => a
      }
    }
    const action = actions.addFilter(filter);
    const expectedAction = {
      type: actions.ADD_FILTER,
      filter
    };
    expect(action).toEqual(expectedAction);
  });

  it('removes a filter', () => {
    // Create REMOVE_FILTER action and compare
    // with expected action.
    const filter = {
      'RegisteringComponent': (a) => a
    };
    const action = actions.removeFilter(filter);
    const expectedAction = {
      type: actions.REMOVE_FILTER,
      filter
    };
    expect(action).toEqual(expectedAction);
  });
});
