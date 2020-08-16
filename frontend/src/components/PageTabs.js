import React from 'react';
import '../styles/App.css';

const PageTabs = ({ previousPage, nextPage, changePage }) => {
    return (
        <div className="page-btn-container">
            {previousPage &&
                <button className="page-btn" onClick={() => changePage('previous')}>
                    Previous Page
                </button>
            }
            {nextPage &&
                <button className="page-btn" onClick={() => changePage('next')}>
                    Next Page
                </button>
            }
        </div>
    );
}

export default PageTabs;