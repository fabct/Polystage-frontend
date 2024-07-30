import React from 'react';

const DataTable = ({ title, headers, data, handleRemove, handleRowClick, addButtonLabel, handleAdd }) => (
    <div className="d-flex flex-column mt-5">
    <h1 style={{ textAlign: 'center', fontFamily: 'CalibriRegular'}}>{title}</h1>
    <table className="table table-striped mt-0">
        <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index} scope="col">{header}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {Array.isArray(data) && data.map((item) => (
                <tr scope="row" onClick={() => handleRowClick && handleRowClick(item.id)}>
                    {Object.values(item).map((value, index) => (
                        <th key={index} style={{ fontFamily: 'CalibriRegular'}}>{value}</th>
                    ))}
                    <th>
                        <button className="btn btn-danger" onClick={() => handleRemove(item.id)}>Retirer</button>
                    </th>
                </tr>
            ))}
        </tbody>
    </table>
    <div className="mt-auto d-flex justify-content-center">
        <button className='btn btn-primary' onClick={handleAdd}>{addButtonLabel}</button>
    </div>
</div>
);

export default DataTable;
