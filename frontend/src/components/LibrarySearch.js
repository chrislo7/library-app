import React from 'react';
import '../styles/App.css';

const LibrarySearch = ({ handleChange, count }) => {
    return (
        <div>
            <div className="search-bar-container">
                    <input className="search-bar" type="text" placeholder="Search By Title"
                    onKeyUp={handleChange}/>
            </div>
            <div className="searched-count">
                {count} results.
            </div>
        </div>
    );
};

export default LibrarySearch