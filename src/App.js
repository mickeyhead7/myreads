import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import BookList from './BookList';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {
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

    componentDidMount () {
        BooksAPI.getAll().then(books => {
            this.setState({
                books: books,
                shelves: this.shelves(books)
            });
        });
    }

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

    search = (query) => {
        BooksAPI.search(query).then(books => {
            this.setState({
                searchResults: books || [],
                query: query
            });
        });
    }

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
