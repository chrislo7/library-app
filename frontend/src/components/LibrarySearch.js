import React from 'react';
import '../styles/App.css';

const LibrarySearch = ({ handleChange, refreshList, search, count }) => {
    return (
        <div>
            <div className="search-bar-container">
                    <input className="search-bar" type="text"
                    onKeyUp={handleChange}/>
            </div>
            <div className="searched-count">
                {count} results.
            </div>
        </div>
    );
};

export default LibrarySearch