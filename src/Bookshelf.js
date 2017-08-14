import React, { Component } from 'react';
import propTypes from 'prop-types';
import Book from './Book';

/**
 * @description Renders a bookshelf
 */
class Bookshelf extends Component {
    static propTypes = {
        title: propTypes.string.isRequired,
        books: propTypes.array.isRequired,
        onMove: propTypes.func.isRequired,
    };

    /**
     * @description Renders the view
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
