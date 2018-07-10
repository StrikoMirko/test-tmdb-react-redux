// Get the proper action definitions and initial state.
import { ADD_FILTER, REMOVE_FILTER } from '../actions/filters';
import initialState from './initialState';

export default (state = initialState.filters, action) => {
  switch (action.type) {
    case ADD_FILTER: {
      // Grab the correct component key.
      const key = Object.keys(action.filter).join();
      // Initialize new filter object, cop of state.
      const filters = { ...state };
      // Add the new filer function prop to the component object.
      filters[key] = { ...filters[key], ...action.filter[key] };
      return filters;
    }
    case REMOVE_FILTER: {
      // Grab the component key and the function key to remove.
      // If there is nothing to remove return state.
      const componentKey = Object.keys(action.filter).join();
      if (!state[componentKey]) {
        return state;
      }
      const functionKey = Object.keys(action.filter[componentKey]).join();
      // Initialize new filter object, cop of state.
      const filters = { ...state };
      // Delete the right filter function.
      delete filters[componentKey][functionKey];
      // If component object has no filter functions
      // Remove it from filters.
      if (!Object.keys(filters[componentKey]).length) {
        delete filters[componentKey];
      }
      return filters;
    }
    default:
      return state;
  }
};
