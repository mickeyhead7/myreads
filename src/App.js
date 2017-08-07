import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import BookList from './BookList';
import * as BookUtils from './utils/books';
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
            // console.log(books);
            this.setState({
                books: books,
                shelves: this.shelves(books)
            });
        });
    }

    shelves = (books) => {
        return {
            currentlyReading: BookUtils.getCurrentlyReading(books).map(book => book.id),
            wantToRead: BookUtils.getWantToRead(books).map(book => book.id),
            read: BookUtils.getRead(books).map(book => book.id)
        }
    }

    search = (query) => {
        BooksAPI.search(query).then(books => {
            // console.log(books);
            this.setState({
                searchResults: books,
                query: query
            });
        });
    }

    move = (book, shelf) => {
        BooksAPI.update(book, shelf).then(shelves => {
            this.setState(previous => {
                previous.books.map(b => {
                    if (b.id === book.id) {
                        b.shelf = shelf;
                    }

                    return b;
                });

                return {
                    books: previous.books,
                    shelves: shelves
                };
            });
        });
    }

    render () {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BookList
                        books={this.state.books}
                        shelves={this.state.shelves}
                        onMove={this.move}
                    />
                )} />
                <Route exact path="/search" render={() => (
                    <SearchPage
                        books={this.state.searchResults}
                        query={this.state.query}
                        onSearch={this.search}
                        onMove={this.move}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp
