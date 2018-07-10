import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as filters from '../actions/filters';

import CheckBoxList from '../components/CheckBoxList';
import RatingFilter from '../components/RatingFilter';

const mapStateToProps = (state) => ({
  filters: state.filters,
  genres: state.genres,
  ...state,
});

const mapDispatchToProps = (dispatch, props) => ({
  filtersActions: bindActionCreators(filters, dispatch),
  ...props,
});

/**
 * React container component for filters.
 */
class FiltersContainer extends Component {
  /**
   * Gets the requested filter
   *
   * @param {string} component
   *
   * @returns {object} fitler object
   */
  getExistingFilters = (component) => {
    return this.props.filters[component] || null;
  };

  /**
   * Gets the CheckBoxList filter
   *
   * @param {string} key
   * @param {number} genreId
   *
   * @returns {object} filter with teh proper filter function,
   * @throws Will throw an error if genreId not set.
   */
  generateCheckboxFilter = (key, genreId) => {
    if (!genreId) {
      throw new Error('Genre ID not defined!');
    }
    return {
      CheckBoxList: {
        [key]: (movies) => {
          return movies.filter(v => {
            return v.genre_ids.filter(g => g.id === genreId).length;
          });
        }
      }
    };
  };

  /**
   * Gets the RatingFilter filter
   *
   * @param {string} key
   * @param {number} vote
   *
   * @returns {object} filter with teh proper filter function,
   * @throws Will throw an error if genreId not set.
   */
  generateVotingFilter = (key, vote) => {
    if (typeof vote === 'undefined') {
      throw new Error('Average vote not defined!');
    }
    return {
      RatingFilter: {
        [key]: (movies) => {
          return movies.filter(v => v.average_vote >= vote);
        }
      }
    };
  };

  /**
   * Hanldles checkbox clicking.
   *
   * @param {object} e
   */
  handleCheckboxClick = (e) => {
    const key = e.target.getAttribute('id');
    const genreId = parseInt(e.target.getAttribute('data-genre'), 10);
    const { checked } = e.target;
    const filter = this.generateCheckboxFilter(key, genreId);
    if (checked) {
      this.props.filtersActions.addFilter(filter);
    } else {
      this.props.filtersActions.removeFilter(filter);
    }
  };

  /**
   * Hanldles the voting fitler change.
   *
   * @param {number} rating
   * @param {string} key
   * @param {bool} remove
   */
  handleVoteFilterChange = (rating, key, remove) => {
    const filter = this.generateVotingFilter(key, rating);
    // If remove is true then remove filter else add it.
    if (!remove) {
      this.props.filtersActions.addFilter(filter);
    } else {
      this.props.filtersActions.removeFilter(filter);
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8">
            <h3>Filter by movie genres</h3>
            <CheckBoxList items={this.props.genres} onClick={this.handleCheckboxClick} />
          </div>
          <div className="col-4">
            <h3>Filter by avarage vote</h3>
            <RatingFilter addFilter={this.handleVoteFilterChange} />
          </div>
        </div>
      </div>
    );
  }
}

FiltersContainer.propTypes = {
  filters: PropTypes.object,
  genres: PropTypes.arrayOf(
    PropTypes.object
  ),
  filtersActions: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);
