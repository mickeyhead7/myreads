import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DebounceInput from 'react-debounce-input';
import Book from './Book';

/**
 * Search page view
 */
class SearchPage extends Component {
    /**
     * Performs a search
     *
     * @param query {string} Search query
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
     * Renders the view
     *
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
