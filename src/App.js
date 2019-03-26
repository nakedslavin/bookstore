import React from 'react';
import {Library} from './views/Library';
import {Search} from './views/Search';
import * as BooksAPI from './BooksAPI';
import {BrowserRouter as Router, Route } from "react-router-dom";

class BooksApp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      search: [],
      searchTerm: '',
      error: null
    };
    this.defaultErr = 'Something went wrong';
  }
  
  async componentDidMount() {
    await this.updateLibrary();
  }

  async componentDidUpdate(props, state) {
    const {searchTerm} = this.state;
    if (state.searchTerm === searchTerm || !searchTerm) return;
    await this.searchLibrary(searchTerm);
  }

  switchShelf = async (shelfName, book, page) => {
    try {
      book.shelf = shelfName;
      await BooksAPI.update(book, shelfName);
      await this.updateLibrary();
    } catch(e) {
      this.setState({error: e});
    }
  }

  updateLibrary = async () => {
    try {
      const books = await BooksAPI.getAll();
      if (Array.isArray(books)) {
        this.setState({
          currentlyReading: books.filter(b => b.shelf === 'currentlyReading'),
          read: books.filter(b => b.shelf === 'read'),
          wantToRead: books.filter(b => b.shelf === 'wantToRead'),
          error: null
        });
      }
      else {
        const { error } = books;
        this.setState({ error });
      }
    }
    catch (e) {
      this.setState({ error: this.defaultErr });
    }
  }

  searchLibrary = async(searchTerm) => {
    try {
      const books = await BooksAPI.search(searchTerm);
      if (Array.isArray(books)) { 
        this.setState({search: books, error: null});
  
      } else {
        const {error} = books;
        this.setState({error, search: []});
      }
    } catch(e) {
      this.setState({error: this.defaultErr, search: []});
    }
  }

  searchBarHandler = (searchTerm) => {
    this.setState({searchTerm});
  }

  render() {
    return (
      <Router>
        <Route path="/" exact component={() => <Library {...this.state} switchShelf={this.switchShelf} />} />
        <Route path="/search/" component={() => <Search {...this.state} 
          switchShelf={this.switchShelf} 
          searchBarHandler={this.searchBarHandler}
          searchLibrary={this.searchLibrary} />} />
      </Router>
    )
  }
}

export default BooksApp;
