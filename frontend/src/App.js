import React, { Component } from 'react';
import axios from "axios";
import './styles/App.css';

import LibrarySearch from "./components/LibrarySearch";
import ViewTabs from "./components/ViewTabs";
import BookList from "./components/BookList";
import PageTabs from "./components/PageTabs";

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
        this.setState({searchQuery: event.target.value});
        this.librarySearch(event.target.value);
    };

    refreshList = () => {
        var path = '/api/books';

        if (this.state.searchQuery || this.state.viewTab !== 'all') {
            path += '?';
        }

        path += this.state.searchQuery ? 'title=' + this.state.searchQuery + '&' : '';

        if (this.state.viewTab === 'reserved') {
            path += 'reserved=true';
        } else if (this.state.viewTab === 'unreserve') {
            path += 'reserved=false';
        }

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

    librarySearch = (query) => {
        var path = '/api/books?';

        path += query ? 'title=' + query + '&' : '';

        if (this.state.viewTab === 'reserved') {
            path += 'reserved=true';
        } else if (this.state.viewTab === 'unreserve') {
            path += 'reserved=false';
        }

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
        } else if (viewTab === 'unreserve') {
            path += 'reserved=false';
        }

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

    render() {
        return (
            <div className="content">
                <h1>Library App</h1>
                <h2>Search for a book by title, or filter through the list by reservation status.</h2>
                <div>
                    <div>
                        <LibrarySearch
                        handleChange={this.handleChange}
                        count={this.state.count}
                        />
                        <ViewTabs
                        displayReserved={this.displayReserved}
                        viewTab={this.state.viewTab}
                        />
                        <BookList
                        bookList={this.state.bookList}
                        reserveBook={this.reserveBook}
                        />
                        <PageTabs
                        nextPage={this.state.nextPage}
                        previousPage={this.state.previousPage}
                        changePage={this.changePage}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;