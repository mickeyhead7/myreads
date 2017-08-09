import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import sortBy from 'sort-by';
import SearchPage from './SearchPage';
import BookList from './BookList';
import * as BooksAPI from './BooksAPI';
import './App.css';

/**
 * Renders the application using routing
 */
class BooksApp extends Component {
    /**
     * @type {object} Application state
     */
    state = {
        books: [],
        searchResults: [],
        query: ''
    }

    /**
     * Retrieves books when the component has mounted
     */
    componentDidMount () {
        BooksAPI.getAll().then(books => {
            this.setState({
                books: books
            });
        });
    }

    /**
     * Performs a book search
     *
     * @param query {string} Search query
     */
    search = (query) => {
        BooksAPI.search(query).then(results => {
            results = results.items ? results.items : results;

            const books = results.map(book => {
                this.state.books.forEach(b => {
                    if (b.id === book.id) {
                        book.shelf = b.shelf;
                    }
                });

                return book;
            });

            this.setState({
                searchResults: books || [],
                query: query
            });
        });
    }

    /**
     * Moves a book to a specified shelf
     *
     * @param book {object} Book to move
     * @param shelf {string} Shelf to move book to
     */
    move = (book, shelf) => {
        this.setState(previous => {
            let books = previous.books.filter(b => b.id !== book.id);

            book.shelf = shelf;
            books.push(book);
            BooksAPI.update(book, shelf);
            books.sort(sortBy('title'));

            return {
                books
            };
        });
    }

    /**
     * Gets the books from a specified shelf
     *
     * @param shelf Shelf identifier
     * @returns {Array.<*>} List of books from a selected shelf
     */
    getBooksFromShelf = (shelf) => {
        if (!['currentlyReading', 'wantToRead', 'read'].includes(shelf)) {
            throw new Error(`Invalid shelf: ${shelf}`)
        }

        return this.state.books.filter(book => book.shelf === shelf);
    }

    /**
     * Renders the application
     *
     * @returns {XML} Application output
     */
    render () {
        const { query, searchResults } = this.state;

        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BookList
                        currentlyReading={this.getBooksFromShelf('currentlyReading')}
                        wantToRead={this.getBooksFromShelf('wantToRead')}
                        read={this.getBooksFromShelf('read')}
                        onMove={this.move}
                    />
                )} />
                <Route exact path="/search" render={() => (
                    <SearchPage
                        books={searchResults}
                        query={query}
                        onSearch={this.search}
                        onMove={this.move}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp
