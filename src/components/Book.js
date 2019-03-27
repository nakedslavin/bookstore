import React from 'react';
import {BookShelfStatus} from './BookShelf';
import * as BooksAPI from '../BooksAPI';
import PropTypes from 'prop-types';

const coverImageSize = {
  width: 128,
  height: 192
};

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelf: BookShelfStatus.none,
      ...props
    };
  }

  async onShelfChange(e) {
    e.preventDefault(); 
    const {coverImageUrl, id, title, authors, shelf, page} = this.state;
    const {switchShelf} = this.props;
    this.setState({shelf});
    await switchShelf(e.target.value, {coverImageUrl, id, shelf, title, authors}, page);
  }

  async componentDidMount() {
    this.mounted = true;
    const {id} = this.props;

    try {
      const {shelf} = await BooksAPI.get(id);
      if (this.mounted) {
        this.setState({shelf});
      }
      
    } catch (e) {
      console.log('shelf identification went wrong', e);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const {coverImageUrl, title, authors, shelf} = this.state;
    return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            ...coverImageSize,
            backgroundImage: `url("${coverImageUrl}")`
          }}
        />
        <div className="book-shelf-changer">
          <select onChange={this.onShelfChange.bind(this)} value={shelf}>
            <option value="move" disabled>
            Move to...
            </option>
            <option value={'currentlyReading'}>{BookShelfStatus.currentlyReading}</option>
            <option value={'wantToRead'}>{BookShelfStatus.wantToRead}</option>
            <option value={'read'}>{BookShelfStatus.read}</option>
            <option value={'none'}>{BookShelfStatus.none}</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>);
  }
}

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  coverImageUrl: PropTypes.string,
  switchShelf: PropTypes.func.isRequired
}

export default Book;