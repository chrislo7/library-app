import React from 'react';
import '../styles/App.css';

import Book from './Book';

const BookList = ({ bookList, reserveBook }) => {
    return (
        <ul className="list-group">
            {
                bookList.map((book, index) => {
                    return <Book key={index} book={book} reserveBook={reserveBook}/>
                })
            }
        </ul>
    );
}

export default BookList;