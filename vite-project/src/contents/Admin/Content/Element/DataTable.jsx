import React from 'react';

const DataTable = ({ title, headers, data, handleRemove, handleRowClick, addButtonLabel, handleAdd }) => (
    <div className='table'>
        <div className='legend'>
            <h1 style={{textAlign:'center', fontFamily: 'CalibriRegular', fontStyle: 'normal'}}>{title}</h1>
            <div className='legend-div'>
                {headers.map((header, index) => (
                    <div style={{flex: 1, margin: 'auto'}} key={index}>{header}</div>
                ))}
            </div>
        </div>
        <div className="render-table">
            {data.map((item) => (
                <div className="tr-style" key={item.id} onClick={() => handleRowClick && handleRowClick(item.id)}>
                    {Object.values(item).map((value, index) => (
                        <div className="cell-style" key={index}>{value}</div>
                    ))}
                    <div className="cell-style">
                        <button className="remove-button" onClick={(e) => {e.stopPropagation(); handleRemove(item.id);}}>Retirer</button>
                    </div>
                </div>
            ))}
        </div>
        <button className='add-button' onClick={handleAdd}>{addButtonLabel}</button>
    </div>
);

export default DataTable;
