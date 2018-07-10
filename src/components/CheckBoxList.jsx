import React from 'react';
import PropTypes from 'prop-types';

/**
 * Pure React component CheckBoxList.
 */
const CheckBoxList = (props) => {
  const { onClick } = props;
  /**
   * Renders teh correct JSX for each CheckboxList item.
   *
   * @param {object} item
   *
   * @returns {object} JSX of each item.
   * @throws Will throw an error if the argument is not a possible value.
   */
  const renderItems = (item) => {
    return (
      <div className="checkbox-li" key={item.id}>
        <label className="checkbox-li__label" htmlFor={`checkfilter-${item.id}`}>
          <input
            className="checkbox-li__input"
            type="checkbox"
            id={`checkfilter-${item.id}`}
            value={item.name}
            data-genre={item.id}
            onClick={onClick}
          />
          {item.name}
        </label>
      </div>
    );
  };

  // Get the JSX for the items using renderItems function.
  const items = props.items.map(v => renderItems(v));

  return (
    <div className="checkbox-list">
      {items}
    </div>
  );
};

// Define the prop types.
CheckBoxList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};

// Set the default props to be empty items array.
CheckBoxList.defaultProps = {
  items: []
};

export default CheckBoxList;
