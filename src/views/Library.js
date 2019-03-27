import React from 'react';
import {BookShelf, BookShelfStatus} from '../components/BookShelf';
import {Link} from "react-router-dom";
import '../App.css';

class LibraryView extends React.Component {
  
  render() {
    const status = BookShelfStatus;
    const {currentlyReading, wantToRead, read, switchShelf} = this.props;
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
                <BookShelf name={status.currentlyReading} books={currentlyReading} switchShelf={switchShelf} />
                <BookShelf name={status.wantToRead} books={wantToRead}  switchShelf={switchShelf} />
                <BookShelf name={status.read} books={read}  switchShelf={switchShelf} />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export const Library = LibraryView;
