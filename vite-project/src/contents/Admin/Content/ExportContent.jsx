import CSVLogo from '../../../assets/CSV.svg';
import XLSLogo from '../../../assets/XLS.svg';
import React, { useState, useEffect } from 'react';

const ExportContent = (props) => {



    const fileTypes = [
        { name: 'CSV', type:'csv',logo: CSVLogo },
        { name: 'Excel', type:'xlsx',logo: XLSLogo },
        // Ajoutez d'autres types de fichiers si nécessaire
    ];

    const handleNote = (e) => {
        props.handleSetExportOption(e);
        props.handleGetPromos();
    }


    return(
        <div style={{gridArea:'result', margin:'10px 20px', height:'auto',background:'white',borderRadius:'20px',overflow:'auto'}}>
            <div style={props.style}>
                <h1 style={{textAlign:'center' ,margin:'25px 47px', color: 'black', fontFamily: 'CalibriRegular', fontSize: '35px', fontWeight: '400'}}>{props.title}</h1>
                <div style={{margin:'10px',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <h1 style={{textAlign:'center' ,margin:'25px 47px', color: 'black', fontFamily: 'CalibriRegular', fontSize: '20px', fontWeight: '400'}}>Selectionner le type de fichier que vous voulez récupérer</h1>
                    <div style={{display: 'flex'}}>
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
                    <h1 style={{textAlign:'center' ,margin:'25px 47px', color: 'black', fontFamily: 'CalibriRegular', fontSize: '20px', fontWeight: '400'}}>Selectionner ce que vous voulez exporter</h1>    
                    <div style={{ padding: '20px', backgroundColor: '#f4f4f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '600px', margin: '20px auto' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '18px', fontWeight: '500', cursor: 'pointer' }}>
                            <input 
                                type="radio" 
                                value="notes" 
                                checked={props.exportOption === 'notes'}
                                onChange={handleNote}
                                style={{ marginRight: '10px' }}
                            />
                            Exporter des notes
                        </label>
                        {props.exportOption === 'notes' && (
                            <select 
                                style={{ width: '100%', height: '50px', margin: '10px 0', borderRadius: '8px', border: '2px solid #356084', fontFamily: 'CalibriRegular', fontSize: '18px', padding: '10px' }} 
                                onChange={(e) => props.handlePromoSelected(e.target.value)}
                            >
                                <option value="">Selectionner une promotion</option>
                                {props.data.map((promo) => (
                                    <option key={promo.id} value={promo.id}>{promo.filiere.nom} {promo.annee}</option>
                                ))}
                            </select>
                        )}
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '18px', fontWeight: '500', cursor: 'pointer' }}>
                            <input 
                                type="radio" 
                                value="database" 
                                checked={props.exportOption === 'database'}
                                onChange={props.handleSetExportOption}
                                style={{ marginRight: '10px' }}
                            />
                            Exporter la base de donnée
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExportContent;