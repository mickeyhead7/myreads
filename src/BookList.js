import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

/**
 * Renders a book list view
 */
class BookList extends Component {
    /**
     * Renders the view
     *
     * @returns {XML} View output
     */
    render () {
        const { currentlyReading, wantToRead, read, onMove } = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf
                            title="Currently Reading"
                            books={currentlyReading}
                            onMove={onMove}
                        />
                        <Bookshelf
                            title="Want to Read"
                            books={wantToRead}
                            onMove={onMove}
                        />
                        <Bookshelf
                            title="Read"
                            books={read}
                            onMove={onMove}
                        />
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
