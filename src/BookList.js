import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import * as BookUtils from './utils/books';

class BookList extends Component {
    render () {
        const currentlyReading = BookUtils.getCurrentlyReading(this.props.books);
        const wantToRead = BookUtils.getWantToRead(this.props.books);
        const read = BookUtils.getRead(this.props.books);

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf title="Currently Reading" books={currentlyReading} onMove={this.props.onMove} />
                        <Bookshelf title="Want to Read" books={wantToRead} onMove={this.props.onMove} />
                        <Bookshelf title="Read" books={read} onMove={this.props.onMove} />
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}

export default BookList;
