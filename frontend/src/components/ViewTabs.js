import React from 'react';
import '../styles/App.css';

const ViewTabs = ({ switchTabs, viewTab }) => {
    return (
        <div className="tabs">
            <button
            onClick={() => switchTabs('all')}
            className={`tab ${viewTab === 'all' ? "active-tab" : ""}`}
            >
                all
            </button>
            <button
            onClick={() => switchTabs('reserved')}
            className={`tab ${viewTab === 'reserved' ? "active-tab" : ""}`}
            >
                reserved
            </button>
            <button
            onClick={() => switchTabs('unreserve')}
            className={`tab ${viewTab === 'unreserve' ? "active-tab" : ""}`}
            >
                free for reservation
            </button>
        </div>
    );
}

export default ViewTabs;