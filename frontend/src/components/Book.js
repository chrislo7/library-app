import React from 'react';
import '../styles/App.css';

const Book = ({ book, reserveBook }) => {
    return (
        <li key={book.id} className="book">
            <div className="text book__title">
                {book.title}
            </div>
            <div className="text book__author">
                By {book.author}
            </div>
            <div className="text book__stock-info">
                <span className="text stock-info__number">
                    {book.quantity} in stock.
                </span>
                <button className="text stock-info__reserve reserve-btn" onClick={() => reserveBook(book)}>
                    { book.reserved ? 'Unreserve' : 'Reserve' }
                </button>
            </div>
        </li>
    );
}

export default Book;

