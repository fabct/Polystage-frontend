import React, { useState } from 'react';
import SearchContent from '../Admin/Content/Element/SearchContent';

const ListView = ({ soutenances }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState([]);
    const itemsPerPage = 5;

    // Calculate total pages
    const totalPages = Math.ceil(search.length / itemsPerPage);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = search.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleInputSearch = (e) => {
        setSearch(e.target.value);
    }


    const handleSearch = () => {
        console.log('Search');
    }

    if(soutenances == null){
        return <div>Loading...</div>;
    }

    return (
        <div className="list-container">
            <div style={{display:'flex'}}>
                <SearchContent
                    handleInputSearch={handleInputSearch}
                    handleSearch={handleSearch}
                    isSearching={true}
                    SearchTitle={'Rechercher une soutenance'}
                    type={'text'}
                />
            </div>
            
            <ul className="soutenance-list">
                {currentItems.map((search, index) => (
                    <li key={index} className="soutenance-item">
                        <h3 className="soutenance-title">{search.title}</h3>
                        <p className="soutenance-description">{search.description}</p>
                        <p className="soutenance-timing">
                            {new Date(search.startDate).toLocaleString()} - {new Date(search.endDate).toLocaleString()}
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
