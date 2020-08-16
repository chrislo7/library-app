import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewReserved: 'all',
            bookList: [],
            nextPage: null,
            previousPage: null,
            searchQuery: '',
            count: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        this.refreshList();
    };

    handleChange(event) {
        this.setState({searchQuery: event.target.value});
    };

    handleSubmit(event) {
        this.search(this.state.searchQuery);
        event.preventDefault();
    };

    refreshList = () => {
        axios
            .get("/api/books/")
            .then((res) => {
                this.setState({ 
                    bookList: res.data.results,
                    nextPage: res.data.next,
                    previousPage: res.data.previous,
                    count: res.data.count
                });
            })
            .catch((err) => {
                console.log(err)
            })
    };

    search = (query) => {
        axios
            .get("/api/books/?title=" + query)
            .then((res) => {
                this.setState({ 
                    bookList: res.data.results,
                    nextPage: res.data.next,
                    previousPage: res.data.previous,
                    count: res.data.count
                });
            })
            .catch((err) => {
                console.log(err)
            });
    };

    changePage = (page) => {
        var url;
        page === 'next' ? url = this.state.nextPage : url = this.state.previousPage;

        axios
            .get(url)
            .then((res) => {
                this.setState({ 
                    bookList: res.data.results,
                    nextPage: res.data.next,
                    previousPage: res.data.previous
                })
            })
            .catch((err) => {
                console.log(err)
            });
    };

    displayReserved = (status) => {
        var path = '/api/books/';

        if (status === 'reserved') {
            path += '?reserved=true';
        } else if (status === 'unreserved') {
            path += '?reserved=false';
        }

        axios
        .get(path)
        .then((res) => {
            this.setState({ 
                viewReserved: status,
                bookList: res.data.results,
                count: res.data.count,
                nextPage: res.data.next,
                previousPage: res.data.previous
            })
            console.log(this.state);
        })
        .catch((err) => {
            console.log(err)
        });

        // this.refreshList();
    };

    reserveBook = (book) => {
        axios
        .put("http://localhost:8000/api/books/" + book.id + '/', {
            id: book.id,
            title: book.title,
            author: book.author,
            quantity: book.quantity,
            reserved: !book.reserved
        })
        .then((res) => {
            this.refreshList();
        })
        .catch((err) => {
            console.log(err)
        });
    };

    renderSearch = () => {
        return (
            <div>
                <div className="search-bar-container">
                    <form onSubmit={ this.handleSubmit }>
                        <input className="search-bar" type="text"
                        value={this.state.value} onChange={this.handleChange}/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                {this.state.count &&
                    <div className="searched-count">
                        {this.state.count} results.
                    </div>
                }
            </div>
        );
    };

    renderTabs = () => {
        return (
            <div className="tabs">
                <button
                    onClick={() => this.displayReserved('all')}
                    className={`tab ${this.state.viewReserved === 'all' ? "active-tab" : ""}`}
                >
                    all
                </button>
                <button
                    onClick={() => this.displayReserved('reserved')}
                    className={`tab ${this.state.viewReserved === 'reserved' ? "active-tab" : ""}`}
                >
                    reserved
                </button>
                <button
                    onClick={() => this.displayReserved('unreserved')}
                    className={`tab ${this.state.viewReserved === 'unreserved' ? "active-tab" : ""}`}
                >
                    free for reservation
                </button>
            </div>
        );
    };

    renderBooks = () => {
        const books = this.state.bookList;
        return books.map(book => (
            <li key={book.id} className="book">
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
                    <button className="text stock-info__reserve" onClick={() => this.reserveBook(book)}>
                        { book.reserved ? 'Unreserve' : 'Reserve' }
                    </button>
                </div>
            </li>
        ));
    };

    renderPageTabs = () => {
        return (
            <div className="page-btn-container">
                {this.state.previousPage &&
                    <button className="page-btn" onClick={() => this.changePage('previous')}>
                        Previous Page
                    </button>
                }
                {this.state.nextPage &&
                    <button className="page-btn" onClick={() => this.changePage('next')}>
                        Next Page
                    </button>
                }
            </div>
        );
    };

    render() {
        return (
            <div className="content">
                <h1>Library App</h1>
                <h2>Search for a book by title, or filter through the list by reservation status.</h2>
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