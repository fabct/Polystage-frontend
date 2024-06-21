import fileIcon from '../../assets/fileIcon.svg';
import React, { useState, useEffect } from 'react';

const DragDrop = (props) => {

    const [currentPage, setCurrentPage] = useState(0);
    const sheetNames = props.data ? Object.keys(props.data) : [];

    useEffect(() => {
        if (sheetNames.length > 0 && currentPage >= sheetNames.length) {
            setCurrentPage(0);
        }
    }, [props.data, currentPage]);

    return(
    <div style={{gridArea:'result', margin:'10px 20px', height:'auto',background:'white',borderRadius:'20px',overflow:'auto'}}>
        <div style={props.style}>
            <h1 style={{textAlign:'center' ,margin:'25px 47px', color: 'black', fontFamily: 'CalibriRegular', fontSize: '35px', fontWeight: '400'}}>{props.title}</h1>
            <div style={{margin:'10px' ,border:'4px dashed #356084',borderRadius:'10px',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <img src={fileIcon} style={{marginTop:'20px',height:'50px',width:'50px'}}/>
                <h1 style={{ color: '#000', fontFamily: 'CalibriRegular', fontSize: '20px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', marginTop: '20px' }}><span style={{color: '#00AEEF'}}>Choose</span> a file to upload</h1>
                <h1 style={{fontSize:'16px', fontFamily:'CalibriRegular',color:'#6b6b6b', fontWeight:'400',fontStyle:'normal'}}>Supported format : pdf</h1>
                <input type="file"  style={{margin:'20px auto'}} onChange={props.handleDropFile} required/>
            </div>
        </div>

        <div style={{padding:'20px',marginTop:'20px',backgroundColor:'whitesmoke',textAlign:'center'}}>
            {props.data && sheetNames.length > 0 ? (
        <>
            <h1 style={{textAlign:'center',margin:'10px 0',color:'#000',fontFamily:'CalibriRegular',fontSize:'20px',fontWeight:'400'}}>Uploaded Data</h1>
            <h2>{sheetNames[currentPage]} Data</h2>
            <table style={{overflow:'auto', height:'200px', width:'100%', textAlign:'center', border:'2px'}}>
                <thead>
                    <tr>
                    {props.data[sheetNames[currentPage]][0] && Object.keys(props.data[sheetNames[currentPage]][0]).map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                {props.data[sheetNames[currentPage]].map((individualData,index) => (
                    <tr key={index}>
                    {Object.values(individualData).map((individualData, index) => (
                        <td key={index}>{individualData}</td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => setCurrentPage((currentPage + 1) % sheetNames.length)}>Next Page</button>
            <button onClick={() => setCurrentPage((currentPage - 1 + sheetNames.length) % sheetNames.length)}>Previous Page</button>
        </>
            ):(
                <>
                    No file upload yet !
                </>
            )}
        </div>
    </div>
    );
};

export default DragDrop;