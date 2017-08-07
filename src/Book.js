import React, { Component } from 'react';

class Book extends Component {
    formatAuthor = (authors = []) => {
        return authors.map((author, key) => (
            <div key={key}>{author}</div>
        ));
    }

    render () {
        const thumbnailUrl = this.props.imageLinks.smallThumbnail || null;
        const thumbnail = `url("${thumbnailUrl}")`;
        const shelf = this.props.shelf || 'none';

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: thumbnail }}></div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={event => this.props.onMove(this.props, event.target.options[event.target.selectedIndex].value)}>
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
