import React from 'react';

const SearchContent = (props) => {
    if(props.isSearching){
        return(
            <>
                <div class="input-group">
                  <div data-mdb-input-init>
                  <input className="form-control me-0" type="search" placeholder={props.SearchTitle} aria-label={props.SearchTitle} onChange={props.handleInputSearch}/>
                  </div>
                  <button type="button" class="btn btn-primary" data-mdb-ripple-init onClick={props.handleSearch}>
                    <i class="fas fa-search"></i>
                  </button>
                </div>
            </>
        );
    }

    return (
        <></>
    );
}

export default SearchContent;