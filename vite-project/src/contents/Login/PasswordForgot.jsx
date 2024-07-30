import React from 'react';
import {Title, Paragraph} from './LoginContent';

const intdivStyle={
    display: 'grid', 
    textAlign: 'center', 
    backgroundColor :'white'
}

const PasswordForgot = (props) => {

    const divStyle={
        ...intdivStyle,
    }

    return(
        <div className="g-start-2 container-fluid">
            <div style={{...divStyle,gridTemplateAreas: `'subtitle' 'p' 'code' 'button'`}}>
                <Title 
                    content={'Mot de passe oublie'}
                />
                <Paragraph 
                    gridArea={'p'}
                    color={'black'}
                    content={'Entrez votre adresse email pour recevoir un code de validation'}
                />
                <div className="form-floating mb-3 mx-20 p-2">
                    <input type="mail" className="form-control" id="floatingInput" placeholder="nom@po.fr" onChange={props.usernameChange} value={props.username}/>
                    <label htmlfor="floatingInput">Email</label>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto" style={{gridArea: 'button'}}>
                    <button type="button" className='btn btn-primary btn-lg mb-5' style={{textAlign:'center', border:'none', fontFamily: 'CalibriRegular', fontSize: '20px',fontWeight: '400'}} onClick={props.handleVerifyUser}>Envoyer</button>
                </div>
            </div>
        </div>
    );
}

export default PasswordForgot;