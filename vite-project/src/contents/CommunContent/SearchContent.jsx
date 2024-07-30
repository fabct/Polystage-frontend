import React from 'react';
import InputSearch from '../Admin/Content/Element/InputSearch';
import SearchButton from '../Admin/Content/Element/SearchButton';

const SearchContent = (props) => {
    if(props.isSearching){
        return(
            <>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder={props.SearchTitle} aria-label={props.SearchTitle} onChange={props.handleInputSearch}/>
                    <SearchButton 
                    onClick={props.handleSearch}
                />
                </form>
            </>
        );
    }

    return (
        <></>
    );
}

export default SearchContent;