// Export the action definitions.
export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';

/**
 * Add a filter
 *
 * @param {object} filter
 *
 * @returns {object} action
 */
export function addFilter(filter) {
  return {
    type: ADD_FILTER,
    filter,
  };
}
/**
 * Remove a filter
 *
 * @param {object} filter
 *
 * @returns {object} action
 */
export function removeFilter(filter) {
  return {
    type: REMOVE_FILTER,
    filter,
  };
}
