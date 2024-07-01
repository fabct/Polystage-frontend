import React from 'react';
import InputSearch from './InputSearch';
import SearchButton from './SearchButton';

const SearchContent = (props) => {
    if(props.isSearching){
        return(
            <>
            <h1 style={{margin: '5px 5px',padding: '10px 10px 0px',color: '#000', fontFamily: 'CalibriRegular', fontSize: '24px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>{props.SearchTitle} :</h1>
            <InputSearch 
                onChange = {props.handleInputSearch}
                margin={'10px 10px'}
                type={props.type}
                onClick={props.handleSearch}
            />
            <SearchButton 
                onClick={props.handleSearch}
            />
            </>
        );
    }

    return (
        <></>
    );
}

export default SearchContent;