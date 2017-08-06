import React, { Component } from 'react';
import DebounceInput from 'react-debounce-input';
import Book from './Book';

class SearchPage extends Component {
    search = (query) => {
        if (!this.props.onSearch) {
            throw new Error('onSearch method not defined');
        }

        this.props.onSearch(query);
    }

    render () {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a href="/" className="close-search">Close</a>
                    <div className="search-books-input-wrapper">
                        <DebounceInput
                            type="text"
                            placeholder="Search by title or author"
                            debounceTimeout={300}
                            onChange={(event) => this.search(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.books.map(book => (
                            <li key={book.id}>
                                <Book {...book} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchPage;
