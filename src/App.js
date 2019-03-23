import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

const BookShelf = () => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">Read</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        <li>
          <Book />
        </li>
      </ol>
    </div>
  </div>
);

const Book = () => (                        
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 192,
          backgroundImage:
            'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")',
        }}
      />
      <div className="book-shelf-changer">
        <select>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">The Adventures of Tom Sawyer</div>
    <div className="book-authors">Mark Twain</div>
  </div>);

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
  }

  render() {
    const searchBooks = (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => this.setState({ showSearchPage: false })}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms in SEARCH_TERMS.MD

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" />
        </div>
      </div>);

    const bookShelfs = {
        reading: 'Currently Reading',
        soon: 'Want to Read',
        read: 'Read'
      };

    return (
      <div className="app">
        {this.state.showSearchPage ? searchBooks : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf name={bookShelfs.reading} />
                <BookShelf name={bookShelfs.soon} />
                <BookShelf name={bookShelfs.read} />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
