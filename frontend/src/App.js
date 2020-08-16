import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewTab: 'all',
            bookList: [],
            nextPage: null,
            previousPage: null,
            searchQuery: '',
            count: null
        };

        this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount() {
        this.refreshList();
    };

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({searchQuery: event.target.value});
        this.search(event.target.value);
    };

    refreshList = () => {
        var path = '/api/books';

        if (this.state.searchQuery || this.state.viewTab !== 'all') {
            path += '?';
        }

        path += this.state.searchQuery ? 'title=' + this.state.searchQuery + '&' : '';

        if (this.state.viewTab === 'reserved') {
            path += 'reserved=true';
        } else if (this.state.viewTab === 'unreserved') {
            path += 'reserved=false';
        }

        console.log(path);

        axios
            .get(path)
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
        var path = '/api/books?';

        path += query ? 'title=' + query + '&' : '';

        if (this.state.viewTab === 'reserved') {
            path += 'reserved=true';
        } else if (this.state.viewTab === 'unreserved') {
            path += 'reserved=false';
        }

        console.log(path);

        axios
            .get(path)
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

    displayReserved = (viewTab) => {
        var path = '/api/books?';

        path += this.state.searchQuery ? 'title=' + this.state.searchQuery + '&' : '';

        if (viewTab === 'reserved') {
            path += 'reserved=true';
        } else if (viewTab === 'unreserved') {
            path += 'reserved=false';
        }

        console.log(path);

        axios
        .get(path)
        .then((res) => {
            this.setState({ 
                viewTab: viewTab,
                bookList: res.data.results,
                count: res.data.count,
                nextPage: res.data.next,
                previousPage: res.data.previous
            })
        })
        .catch((err) => {
            console.log(err)
        });
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
                        <input className="search-bar" type="text"
                        value={this.state.value} onKeyUp={this.handleChange}/>
                        {/* <input type="submit" value="Submit" /> */}
                </div>
                <div className="searched-count">
                    {this.state.count} results.
                </div>
            </div>
        );
    };

    renderTabs = () => {
        return (
            <div className="tabs">
                <button
                    onClick={() => this.displayReserved('all')}
                    className={`tab ${this.state.viewTab === 'all' ? "active-tab" : ""}`}
                >
                    all
                </button>
                <button
                    onClick={() => this.displayReserved('reserved')}
                    className={`tab ${this.state.viewTab === 'reserved' ? "active-tab" : ""}`}
                >
                    reserved
                </button>
                <button
                    onClick={() => this.displayReserved('unreserved')}
                    className={`tab ${this.state.viewTab === 'unreserved' ? "active-tab" : ""}`}
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