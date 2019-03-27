import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
  
export const BookShelfStatus = {
    currentlyReading: 'Currently Reading',
    wantToRead: 'Want to Read',
    read: 'Read',
    none: 'None'
};

export const BookShelf = ({name, books, switchShelf, page}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{name}</h2>
    <div className="bookshelf-books">
      <BookShelfInner books={books} switchShelf={switchShelf} page={page} />
    </div>
  </div>
);

export const BookShelfInner = ({books, switchShelf, page}) => (
    <ol className="books-grid">
      {books.map((book, i) => (<Book key={i} id={book.id} title={book.title} authors={book.authors} coverImageUrl={book.imageLinks ? book.imageLinks.smallThumbnail : null} switchShelf={switchShelf} page={page} />))}
    </ol>
);

BookShelf.propTypes = { 
    name: PropTypes.string.isRequired, 
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    switchShelf: PropTypes.func.isRequired
};