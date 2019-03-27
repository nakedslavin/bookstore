import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

class SearchBar extends React.Component {

  searchBarHandler(e) {
    e.preventDefault();
    this.props.searchBarHandler(e.target.value); 
  }

  componentDidMount() {
    this.searchBox.focus();
  }

  render() {
    return (
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" 
                ref={(input) => { this.searchBox = input; }}
                value={this.props.searchTerm} 
                onChange={this.searchBarHandler.bind(this)} placeholder="Search by title or author" />
          </div>
        </div>);
    }
}

SearchBar.propTypes = { 
    searchLibrary: PropTypes.func.isRequired, 
    searchBarHandler: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired
};

export default SearchBar;