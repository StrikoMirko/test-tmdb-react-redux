import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PrettyRating from './PrettyRating';

/**
 * React component for RatingFilter.
 */
class RatingFilter extends Component {
  /**
   * Constructor function, set default state.
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      rating: 3,
      enabled: false
    };
  }

  /**
   * Enable or disable ability to filter movies.
   *
   * @param {object} e
   */
  handleCheckboxClick = (e) => {
    const { checked } = e.target;
    const { rating } = this.state;
    if (checked) {
      this.props.addFilter(rating, 'pretty-rating__input', false);
      this.setState({ enabled: checked });
    } else {
      this.props.addFilter(rating, 'pretty-rating__input', true);
      this.setState({ enabled: false });
    }
  };

  /**
   * Handles incrementing the vote fitler.
   */
  handleIncrement = () => {
    if (!this.state.enabled) {
      return;
    }
    let { rating } = this.state;
    if (rating < 10) {
      // Remove the filter that is currently there.
      this.props.addFilter(rating, 'pretty-rating__input', true);
      rating += this.props.increment;
      this.setState({ rating });
      // Add the new filter with the updated value.
      this.props.addFilter(rating, 'pretty-rating__input', false);
    }
  };

  /**
   * Handles decrementing the vote fitler.
   */
  handleDecrement = () => {
    if (!this.state.enabled) {
      return;
    }
    let { rating } = this.state;
    if (rating > 0) {
      // Remove the filter that is currently there.
      this.props.addFilter(rating, 'pretty-rating__input', true);
      rating -= this.props.increment;
      this.setState({ rating });
      // Add the new filter with the updated value.
      this.props.addFilter(rating, 'pretty-rating__input', false);
    }
  };

  render() {
    const { enabled, rating } = this.state;
    return (
      <div className="rating-filter">
        <div className="rating-filter__wrapper">
          <label className="rating-filter__label" htmlFor="rating-filter-filter">
            <input
              className="rating-filter__input"
              type="checkbox"
              id="rating-filter-filter"
              value={1}
              onClick={this.handleCheckboxClick}
            />
            Enable vote filter
          </label>
        </div>
        <PrettyRating
          increment={this.props.increment}
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          rating={rating}
          enabled={enabled}
        />
      </div>
    );
  }
}

RatingFilter.propTypes = {
  addFilter: PropTypes.func,
  increment: PropTypes.number
};

// Default value for increment to be 0.5
RatingFilter.defaultProps = {
  increment: 0.5
};

export default RatingFilter;
