import React from 'react';
import '../styles/App.css';

const PageTabs = ({ previousPage, nextPage, changePage, currentPage }) => {
    return (
        <div className="page-btn-container">
            <button className={`page-btn ${ !previousPage ? 'hidden-btn' : '' } `} onClick={() => changePage('previous')}>
                Previous Page
            </button>
            <div className="page-number">
                Current Page: {currentPage}
            </div>
            <button className={`page-btn ${ !nextPage ? 'hidden-btn' : '' } `} onClick={() => changePage('next')}>
                Next Page
            </button>
        </div>
    );
}

export default PageTabs;