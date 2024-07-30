import React from 'react';
import {Title, Paragraph} from './LoginContent';

const intdivStyle={
    display: 'grid', 
    textAlign: 'center', 
    backgroundColor :'white'
}

const VerifyCode = (props) => {

    const divStyle={
        ...intdivStyle,
    }

    return(
        <div className="g-start-2 container-fluid">
            <div style={{...divStyle,gridTemplateAreas: `'subtitle' 'p' 'code' 'button'`}}>
                <Title 
                    content={'Verification du Code'}
                />
                <Paragraph 
                    gridArea={'p'}
                    color={'black'}
                    content={'Entrez le code de validation envoyé à votre adresse email'}
                />
                <div className="form-floating mb-3 mx-20 p-2">
                    <input type="text" className="form-control" id="floatingInput" placeholder="1234252" onChange={props.codeOnChange} value={props.codeValue}/>
                    <label htmldor="floatingInput">Code de validation</label>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto" style={{gridArea: 'button'}}>
                    <button type="button" className='btn btn-primary btn-lg mb-5' style={{textAlign:'center', border:'none', fontFamily: 'CalibriRegular', fontSize: '20px',fontWeight: '400'}} onClick={props.handleVerifyCode}>Envoyer</button>
                </div>
            </div>
        </div>
    );
}

export default VerifyCode;