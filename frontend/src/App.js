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
            currentPage: 1,
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

    refreshList = (currentPage) => {
        var path = 'http://localhost:8000/api/books?';

        if (currentPage) {
            path += ('page=' + currentPage);
        }

        path += this.state.searchQuery ? '&title=' + this.state.searchQuery : "";

        if (this.state.viewTab === 'reserved') {
            path += '&reserved=true';
        } else if (this.state.viewTab === 'unreserve') {
            path += '&reserved=false';
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
                this.setState(prevState => {
                    return {
                        bookList: res.data.results,
                        currentPage: page === 'next' ? prevState.currentPage++ : prevState.currentPage--,
                        nextPage: res.data.next,
                        previousPage: res.data.previous
                    } 
                })
            })
            .catch((err) => {
                console.log(err)
            });
    };

    switchTabs = (viewTab) => {
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
                currentPage: 1, // default to page 1 when switching tabs
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
            var viewTab = this.state.viewTab;
            var count = this.state.count;

            // each page only has 3 books
            // e.g. if on the reserved tab, page 2 only has 1 book, unreserving it should send user back to page 1
            // e.g. if on the unreserved tab, page 2 only has 1 book, reserving it should send user back to page 1

            if (viewTab !== 'all') {
                count--;
            }

            if (count % 3 === 0) {
                this.setState(prevState => {
                    return { currentPage: prevState.currentPage-- }
                });
            }    

            this.refreshList(this.state.currentPage);
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
                        switchTabs={this.switchTabs}
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
                        currentPage={this.state.currentPage}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;