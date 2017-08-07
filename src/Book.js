import React, { Component } from 'react';

class Book extends Component {
    formatAuthor = (authors = []) => {
        return authors.map((author, key) => (
            <div key={key}>{author}</div>
        ));
    }

    render () {
        const thumbnail = `url("${this.props.imageLinks.smallThumbnail}")`;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: thumbnail }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.props.shelf} onChange={event => this.props.onMove(this.props, event.target.options[event.target.selectedIndex].value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.formatAuthor(this.props.authors)}</div>
            </div>
        );
    }
}

export default Book;
