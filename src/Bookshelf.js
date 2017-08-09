import React, { Component } from 'react';
import Book from './Book';

/**
 * Renders a bookshelf
 */
class Bookshelf extends Component {
    /**
     * Renders the view
     *
     * @returns {XML} View output
     */
    render () {
        const { title, books, onMove } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book, key) => (
                            <li key={key}>
                                <Book
                                    {...book}
                                    original={book}
                                    onMove={onMove}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Bookshelf;
