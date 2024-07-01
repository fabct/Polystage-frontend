import fileIcon from '../../../assets/fileIcon.svg';
import userIcon from '../../../assets/user.svg';
import stageIcon from '../../../assets/stage.svg';
import soutenanceIcon from '../../../assets/soutenance.svg';
import juryIcon from '../../../assets/group.svg';
import React, { useState, useEffect } from 'react';

const ImportContent = (props) => {

    const [currentPage, setCurrentPage] = useState(0);

    const sheetNames = props.data ? Object.keys(props.data) : [];

    useEffect(() => {
        if (sheetNames.length > 0 && currentPage >= sheetNames.length) {
            setCurrentPage(0);
        }
    }, [props.data, currentPage]);

    const fileTypes = [
        { name: 'Utilisateur', type:'user',logo: userIcon },
        { name: 'Stage', type:'stage',logo: stageIcon },
        { name: 'Jury', type:'jury',logo: juryIcon },
        { name: 'Soutenance', type:'soutenance',logo: soutenanceIcon },
        // Ajoutez d'autres types de fichiers si nécessaire
    ];


    const handleClick = () => {
        document.getElementById('fileInput').click();
    };

    return(
    <div style={{gridArea:'result', height:'auto',background:'white',borderRadius:'5px',overflow:'auto'}}>
        
        <div>
            <h1 style={{textAlign:'center',margin:'10px 0',color:'#000',fontFamily:'CalibriRegular',fontSize:'20px',fontWeight:'400'}}>Choisissez quel type de donnée vous souhaitez importez</h1>
            <div style={{display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
                {fileTypes.map((type) => (
                            <div 
                                key={type.name} 
                                onClick={() => props.setFileType(type.type)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px 20px',
                                    margin: '10px 20px',
                                    backgroundColor: props.fileType === type.type ? '#00AEEF' : '#f9f9f9',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6f7ff'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = props.fileType === type.type ? '#00AEEF' : '#f9f9f9'}
                            >
                                <span style={{ fontSize: '16px', fontWeight: '500' }}>{type.name}</span>
                                <img 
                                    src={type.logo} 
                                    alt={type.name} 
                                    style={{ width: '30px', height: '30px', marginLeft: '15px' }} 
                                />
                            </div>
                    ))}
            </div>
        </div>
        
        <div style={props.style}>
            <div 
                onClick={handleClick}
                style={{
                    margin: '10px',
                    border: '4px dashed #356084',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    cursor: 'pointer'
                }}
            >
                <img src={fileIcon} style={{marginTop:'20px',height:'50px',width:'50px'}}/>
                <h1 style={{ color: '#000', fontFamily: 'CalibriRegular', fontSize: '20px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', marginTop: '20px' }}><span style={{color: '#00AEEF'}}>Choose</span> a file to upload, Click or Drag and Drop</h1>
                <h1 style={{fontSize:'16px', fontFamily:'CalibriRegular',color:'#6b6b6b', fontWeight:'400',fontStyle:'normal'}}>Supported format : xlsx</h1>
                <input 
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={props.handleDropFile}
                    required
                />
            </div>
        </div>

        <div style={{ padding: '20px', marginTop: '20px', backgroundColor: 'whitesmoke', textAlign: 'center'}}>
            {props.data && sheetNames.length > 0 ? (
        <>
            <h1 style={{ textAlign: 'center', margin: '10px 0', color: '#356084', fontFamily: 'CalibriRegular', fontSize: '24px', fontWeight: '400' }}>Uploaded Data</h1>
            <h2 style={{ color: '#6b6b6b', fontFamily: 'CalibriRegular', fontSize: '20px', fontWeight: '400', marginBottom: '20px' }}>{sheetNames[currentPage]} Data</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                    {props.data[sheetNames[currentPage]][0] && Object.keys(props.data[sheetNames[currentPage]][0]).map((key) => (
                        <th key={key} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', fontFamily: 'CalibriRegular', fontSize: '16px', fontWeight: '400' }}>{key}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                {props.data[sheetNames[currentPage]].map((individualData,index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                    {Object.values(individualData).map((individualData, index) => (
                        <td key={index} style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'CalibriRegular', fontSize: '16px', fontWeight: '400' }}>{individualData}</td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </>
            ):(
                <>
                   <h2 style={{ color: '#6b6b6b', fontFamily: 'CalibriRegular', fontSize: '20px', fontWeight: '400' }}> No file upload yet ! </h2>
                </>
            )}
        </div>
    </div>
    );
};

export default ImportContent;