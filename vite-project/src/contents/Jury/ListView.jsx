import React, { useState } from 'react';

const ListView = ({ soutenances }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate total pages
    const totalPages = Math.ceil(soutenances.length / itemsPerPage);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = soutenances.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="list-container">
            <ul className="soutenance-list">
                {currentItems.map((soutenance, index) => (
                    <li key={index} className="soutenance-item">
                        <h3 className="soutenance-title">{soutenance.title}</h3>
                        <p className="soutenance-description">{soutenance.description}</p>
                        <p className="soutenance-timing">
                            {new Date(soutenance.startDate).toLocaleString()} - {new Date(soutenance.endDate).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ListView;
