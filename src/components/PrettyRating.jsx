import React from 'react';
import PropTypes from 'prop-types';

/**
 * Pure React component PrettyRating.
 */
const PrettyRating = (props) => {
  const {
    onIncrement, onDecrement, increment, rating, enabled
  } = props;
  console.log(enabled);
  return (
    <div className="pretty-rating">
      <button
        className="pretty-rating__button pretty-rating__button--decrement"
        onClick={onDecrement}
        disabled={!enabled}
      >
        -
      </button>
      <input
        type="number"
        value={rating}
        className="pretty-rating__input"
        data-increment={increment}
        readOnly={1}
      />
      <button
        className="pretty-rating__button pretty-rating__button--increment"
        onClick={onIncrement}
        disabled={!enabled}
      >
        +
      </button>
    </div>
  );
};

// Define the prop types.
PrettyRating.propTypes = {
  increment: PropTypes.number,
  rating: PropTypes.number,
  enabled: PropTypes.bool,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func
};


export default PrettyRating;
