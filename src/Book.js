import React, { Component } from 'react';
import nestedProperty from 'nested-property';

/**
 * Renders a book
 */
class Book extends Component {
    /**
     * Formats the authors for output
     *
     * @param authors {array} Authors
     * @returns {XML} Formatted output
     */
    formatAuthor = (authors = []) => {
        return authors.map((author, key) => (
            <div key={key}>{author}</div>
        ));
    }

    /**
     * Renders the view
     *
     * @returns {XML} View output
     */
    render () {
        const { title, authors, imageLinks, onMove, findShelf } = this.props;
        const thumbnailUrl = nestedProperty.get(imageLinks, 'smallThumbnail') || null;
        const thumbnail = `url("${thumbnailUrl}")`;
        const shelf = findShelf(this.props);

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: thumbnail }} />
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={event => onMove(this.props, event.target.options[event.target.selectedIndex].value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{this.formatAuthor(authors)}</div>
            </div>
        );
    }
}

export default Book;
