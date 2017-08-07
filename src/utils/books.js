export function getCurrentlyReading (books) {
    return books.filter(book => book.shelf === 'currentlyReading');
}

export function getWantToRead (books) {
    return books.filter(book => book.shelf === 'wantToRead');
}

export function getRead (books) {
    return books.filter(book => book.shelf === 'read');
}
