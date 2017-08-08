import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
        shelves: {
            currentlyReading: [],
            wantToRead: [],
            read: []
        },
        searchResults: [],
        query: ''
    }

    /**
     * Retrieves books when the component has mounted
     */
    componentDidMount () {
        BooksAPI.getAll().then(books => {
            this.setState({
                books: books,
                shelves: this.shelves(books)
            });
        });
    }

    /**
     * Generates arrays of bookshelves by book.id
     *
     * @param books {array} All books
     * @returns {object} Formatted book shelves
     */
    shelves = (books) => {
        const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
            .map(book => book.id);

        const wantToRead = books.filter(book => book.shelf === 'wantToRead')
            .map(book => book.id);

        const read = books.filter(book => book.shelf === 'read')
            .map(book => book.id);

        return {
            currentlyReading,
            wantToRead,
            read
        }
    }

    /**
     * Performs a book search
     *
     * @param query {string} Search query
     */
    search = (query) => {
        BooksAPI.search(query).then(books => {
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
        BooksAPI.update(book, shelf).then(shelves => {
            this.setState(previous => {
                const books = previous.books.filter(b => b.id !== book.id);

                books.push(book);

                return {
                    books,
                    shelves
                };
            });
        });
    }

    /**
     * Finds the shelf of a given book
     *
     * @param book {object} Book to query
     * @returns {string} Book shelf
     */
    findShelf = (book) => {
        const { shelves } = this.state;

        if (shelves.currentlyReading.includes(book.id)) {
            return 'currentlyReading';
        } else if (shelves.wantToRead.includes(book.id)) {
            return 'wantToRead';
        } else if (shelves.read.includes(book.id)) {
            return 'read';
        }

        return 'none';
    }

    /**
     * Renders the application
     *
     * @returns {XML} Application output
     */
    render () {
        const { shelves, books, query } = this.state;
        const currentlyReading = books.filter(book => shelves.currentlyReading.includes(book.id));
        const wantToRead = books.filter(book => shelves.wantToRead.includes(book.id));
        const read = books.filter(book => shelves.read.includes(book.id));

        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BookList
                        currentlyReading={currentlyReading}
                        wantToRead={wantToRead}
                        read={read}
                        onMove={this.move}
                        findShelf={this.findShelf}
                    />
                )} />
                <Route exact path="/search" render={() => (
                    <SearchPage
                        books={books}
                        query={query}
                        onSearch={this.search}
                        onMove={this.move}
                        findShelf={this.findShelf}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp
