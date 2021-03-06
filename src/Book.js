import React, { Component } from 'react';
import propTypes from 'prop-types';

/**
 * @description Renders a book
 */
class Book extends Component {
    static propTypes = {
        title: propTypes.string.isRequired,
        authors: propTypes.array,
        shelf: propTypes.string,
        imageLinks: propTypes.shape({
            smallThumbnail: propTypes.string.isRequired,
        }),
    };

    /**
     *
     * @description Formats the authors for output
     * @param authors {Array} Authors
     * @returns {XML} Formatted output
     */
    formatAuthor = (authors = []) => authors.map((author, key) => (
        <div key={key}>{author}</div>
    ));

    /**
     * @description Handle moving a book to a shelf
     * @param event Trigger event
     * @returns {*} Result of move method
     */
    handleMove = event => {
        const shelf = event.target.options[event.target.selectedIndex].value;

        return this.props.onMove(this.props.id, shelf);
    };

    /**
     * @description Renders the view
     * @returns {XML} View output
     */
    render () {
        const { title, authors, shelf, imageLinks } = this.props;
        const thumbnailUrl = imageLinks.smallThumbnail;
        const backgroundImage = `url("${thumbnailUrl}")`;

        return (
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{ width: 128, height: 193, backgroundImage }}
                    />
                    <div className="book-shelf-changer">
                        <select value={shelf || 'none'} onChange={this.handleMove}>
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
