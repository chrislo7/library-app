import React from 'react';
import '../styles/App.css';

const ViewTabs = ({ displayReserved, viewTab }) => {
    return (
        <div className="tabs">
            <button
            onClick={() => displayReserved('all')}
            className={`tab ${viewTab === 'all' ? "active-tab" : ""}`}
            >
                all
            </button>
            <button
            onClick={() => displayReserved('reserved')}
            className={`tab ${viewTab === 'reserved' ? "active-tab" : ""}`}
            >
                reserved
            </button>
            <button
            onClick={() => displayReserved('unreserve')}
            className={`tab ${viewTab === 'unreserve' ? "active-tab" : ""}`}
            >
                free for reservation
            </button>
        </div>
    );
}

export default ViewTabs;