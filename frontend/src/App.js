import React, { Component } from 'react';
import './App.css';

// hardcoded values

const response = {
    "count": 10,
    "next": "http://localhost:8000/api/books/?page=2",
    "previous": null,
    "results": [
        {
            "id": "1",
            "title": "Python Crash Course",
            "author": "Eric Matthes",
            "quantity": 5,
            "reserved": false
        },
        {
            "id": "2",
            "title": "Head-First Python",
            "author": "Paul Barry",
            "quantity": 2,
            "reserved": false
        },
        {
            "id": "3",
            "title": "Invent Your Own Computer Games with Python",
            "author": "Al Sweigart",
            "quantity": 1,
            "reserved": true
        }
    ]
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewReserved: false,
            bookList: response.results,
            nextPage: response.next,
            previousPage: response.previous
        };
    }

    displayReserved = (status) => {
        if (status) {
            return this.setState({ viewReserved: true });
        } else {
            return this.setState({ viewReserved: false });
        }
    };

    renderSearch = () => {
        return (
            <div className="search-bar-container">
                <input className="search-bar" type="text"/>
                <button className="search-btn">
                    Search
                </button>
            </div>
        );
    };

    renderTabs = () => {
        return (
            <div className="tabs">
                <button
                    onClick={() => this.displayReserved(true)}
                    className={`tab ${this.state.viewReserved ? "active" : ""}`}
                >
                    reserved
                </button>
                <button
                    onClick={() => this.displayReserved(false)}
                    className={`tab ${!this.state.viewReserved ? "active" : ""}`}
                >
                    free for reservation
                </button>
            </div>
        );
    };

    renderBooks = () => {
        const { viewReserved } = this.state;
        const books = this.state.bookList.filter(
            book => book.reserved == viewReserved
        );
        return books.map(book => (
            <li
                key={book.id}
                className={`book ${ this.state.viewReserved ? "reserved-book" : ""}`}
            >
                <div className="text book__title">
                    {book.title} by {book.author}
                </div>
                <div className="text book__author">
                    By {book.author}
                </div>
                <div className="text book__stock-info">
                    <span className="text stock-info__number">
                        {book.quantity} in stock.
                    </span>
                    <button className="text stock-info__reserve"> Reserve Now </button>
                </div>
            </li>
        ));
    };

    renderPageTabs = () => {
        return (
            <div className="page-btn-container">
                <form className="page-btn" action={`${this.state.previousPage}`}>
                    <input className="btn-input" type="submit" value="Previous" />
                </form>
                <form className="page-btn" action={`${this.state.nextPage}`}>
                    <input className="btn-input" type="submit" value="Next" />
                </form>
            </div>
        );
    };

    render() {
        return (
            <div className="content">
                <h1>Library app</h1>
                <div>
                    <div>
                        {this.renderSearch()}
                        {this.renderTabs()}
                        <ul className="list-group">
                            {this.renderBooks()}
                        </ul>
                        <div>
                            { this.renderPageTabs() }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;