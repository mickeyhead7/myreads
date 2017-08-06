import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

class BookList extends Component {
    currentlyReading = () => {
        return this.props.books.filter(book => book.shelf === 'currentlyReading');
    }

    wantToRead = () => {
        return this.props.books.filter(book => book.shelf === 'wantToRead');
    }

    read = () => {
        return this.props.books.filter(book => book.shelf === 'read');
    }

    render () {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf title="Currently Reading" books={this.currentlyReading()} />
                        <Bookshelf title="Want to Read" books={this.wantToRead()} />
                        <Bookshelf title="Read" books={this.read()} />
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