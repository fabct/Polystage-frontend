import React from 'react';
import InputSearch from './InputSearch';
import SearchButton from './SearchButton';

const SearchContent = (props) => {
    if(props.isSearching){
        return(
            <>
            <h1 style={{margin: '5px 10px',padding: '10px 10px 0px',color: '#000', fontFamily: 'CalibriRegular', fontSize: '24px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>{props.SearchTitle} :</h1>
            {
                props.inputs.map((input, index) => (
                    <div key={index} style={{padding: '2px 10px',margin:'10px' ,display: 'flex'}}> 
                        <h1 style={{margin:'0',color: '#000', fontFamily: 'CalibriRegular', fontSize: '24px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>{input.name} :</h1>
                        <InputSearch 
                            onChange = {input.handleInputSearch}
                            marginLeft={'15px'}
                            type={input.type}
                        />
                    </div>
                ))
            }
            <div style={{padding: '0px 10px 10px 10px',margin:'10px',display: 'flex'}}>
                <SearchButton 
                    onClick={props.handleSearch}
                />
            </div>
            </>
        );
    }

    return (
        <></>
    );
}

export default SearchContent;