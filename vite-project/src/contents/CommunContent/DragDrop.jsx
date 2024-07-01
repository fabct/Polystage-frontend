import React, { useState } from 'react';
import fileIcon from '../../assets/fileIcon.svg';

const DragAndDrop = ({ handleDropFile }) => {
    const [dragging, setDragging] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleDropFile(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    const handleClick = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
            style={{
                margin: '10px',
                border: dragging ? '4px dashed #00AEEF' : '4px dashed #356084',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                cursor: 'pointer'
            }}
        >
            <img src={fileIcon} style={{ marginTop: '20px', height: '50px', width: '50px' }} />
            <h1 style={{ color: '#000', fontFamily: 'CalibriRegular', fontSize: '20px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', marginTop: '20px' }}>
                <span style={{ color: '#00AEEF' }}>Choose</span> a file to upload
            </h1>
            <h1 style={{ fontSize: '16px', fontFamily: 'CalibriRegular', color: '#6b6b6b', fontWeight: '400', fontStyle: 'normal' }}>Supported format : pdf</h1>
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={(e) => handleDropFile(e.target.files)}
                required
            />
        </div>
    );
};

export default DragAndDrop;
