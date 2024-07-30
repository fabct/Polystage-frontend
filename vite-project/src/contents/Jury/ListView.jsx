import React, { useEffect, useState } from 'react';
import { post } from '../../service/service';
import SearchContent from '../CommunContent/SearchContent';
import Loading from '../Loading';

const ListView = ({ soutenances }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState([]);
    const [result, setResult] = useState([]);
    const itemsPerPage = 5;

    // Calculate total pages
    const totalPages = Math.ceil(result.length / itemsPerPage);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = result.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        handleSearch();
    }, []);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleInputSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = () => {
        return post('soutenanceSearch/', {search: search}).then((response) => {
            if (response.error) {
                console.error(response.error);
                props.setError(true);
                props.setMessageError(response.error);
            } else {
                setResult(Array.isArray(response) ? response : []);
            }
        });
    }

    if(soutenances == null){
        return <Loading />;
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
                {currentItems.map((result, index) => (
                    <li key={index} className="soutenance-item">
                        <h3 className="soutenance-title">{result.title}</h3>
                        <p className="soutenance-description">{result.description}</p>
                        <p className="soutenance-timing">
                            {new Date(result.startDate).toLocaleString()} - {new Date(result.endDate).toLocaleString()}
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
