import React, { Component } from 'react';
import SearchPage from './SearchPage';
import BookList from './BookList';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {
    state = {
        search: [],
        books: []
    }

    componentDidMount () {
        BooksAPI.getAll().then(books => {
            // console.log(books);
            this.setState({
                books
            });
        });
    }

    search = (query) => {
        BooksAPI.search(query).then(books => {
            // console.log(books);
            this.setState({
                search: books
            });
        });
    }

    render () {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BookList
                        books={this.state.books}
                    />
                )} />
                <Route exact path="/search" render={() => (
                    <SearchPage
                        onSearch={this.search}
                        books={this.state.search}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp
