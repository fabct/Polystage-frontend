import React from 'react';
import {Title, Paragraph} from './LoginContent';

const intdivStyle={
    display: 'grid', 
    textAlign: 'center', 
    backgroundColor :'white'
}

const PasswordChange = (props) => {

    const divStyle={
        ...intdivStyle,
    }

    return(
        <div className="g-start-2 container-fluid">
            <div style={{...divStyle,gridTemplateAreas: `'subtitle' 'p' 'code' 'password1' 'password2' 'button'`}}>
                <Title 
                    content={'Changement de mot de passe'}
                />
                <Paragraph 
                    gridArea={'p'}
                    color={'black'}
                    content={'Entrez le code de validation précédent et votre nouveau mot de passe'}
                />
                <div className="form-floating mb-3 mx-20 p-2">
                    <input type="text" className="form-control" id="floatingInput" placeholder="1234252" onChange={props.codeOnChange} value={props.codeValue}/>
                    <label htmlfor="floatingInput">Code de validation</label>
                </div>
                <div className="form-floating mb-3 mx-20 p-2">
                    <input type="password" className="form-control" id="floatingInput" placeholder="1234252" onChange={props.handlePasswordChange} value={props.password}/>
                    <label htmlfor="floatingInput">Mot de Passe</label>
                </div>
                <div className="form-floating mb-3 mx-20 p-2">
                    <input type="password" className="form-control" id="floatingInput" placeholder="1234252" onChange={props.handleConfirmPassword} value={props.confirmPassword}/>
                    <label htmlfor="floatingInput">Confirmation du mot de passe</label>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto" style={{gridArea: 'button'}}>
                    <button type="button" className='btn btn-primary btn-lg mb-5' style={{textAlign:'center', border:'none', fontFamily: 'CalibriRegular', fontSize: '20px',fontWeight: '400'}} onClick={props.handleResetPassword}>Envoyer</button>
                </div>
            </div>
        </div>
    );
}

export default PasswordChange;