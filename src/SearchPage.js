import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';
import Book from './Book';

/**
 * @description Search page view
 */
class SearchPage extends Component {
    static propTypes = {
        query: propTypes.string,
        books: propTypes.array.isRequired,
        onMove: propTypes.func.isRequired,
    };

    /**
     * @description Performs a search
     * @param event {object} Search input event
     * @returns {*} Result of search method
     */
    search = (event) => {
        const query = event.target.value;

        if (!this.props.onSearch) {
            throw new Error('onSearch method not defined');
        }

        return this.props.onSearch(query);
    };

    /**
     * @description Renders the view
     * @returns {XML} View output
     */
    render () {
        const { query, books, onMove } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <DebounceInput
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            debounceTimeout={300}
                            onChange={this.search}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map(book => (
                            <li key={book.id}>
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

export default SearchPage;
