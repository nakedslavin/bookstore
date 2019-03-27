import React from 'react';
import {BookShelfInner} from '../components/BookShelf';
import SearchBar from '../components/SearchBar';

class SearchView extends React.Component {

  render() {
    const {searchBarHandler, searchLibrary, searchTerm, switchShelf, search, error} = this.props;
    return (
      <div className="search-books">
        <SearchBar searchLibrary={searchLibrary} searchBarHandler={searchBarHandler} searchTerm={searchTerm} />
        <div className="search-books-results">
          {error && <p className="error">{error}</p>}
          <ol className="books-grid">
            <BookShelfInner books={search} switchShelf={switchShelf} page="Search" />
          </ol>
        </div>
      </div>);
  }
}

export const Search = SearchView;
