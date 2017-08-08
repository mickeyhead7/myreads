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
     */
    search = (query) => {
        if (!this.props.onSearch) {
            throw new Error('onSearch method not defined');
        }

        this.props.onSearch(query);
    }

    /**
     * Renders the view
     *
     * @returns {XML} View output
     */
    render () {
        const { query, onMove, findShelf } = this.props;

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
                            onChange={event => this.search(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.books.map(book => (
                            <li key={book.id}>
                                <Book
                                    {...book}
                                    onMove={onMove}
                                    findShelf={findShelf}
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
