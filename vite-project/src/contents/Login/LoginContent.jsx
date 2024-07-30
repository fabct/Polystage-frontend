import React from 'react';
import InputLogin from './InputLoginPage';
import Button from './ButtonLoginPage';

const intdivStyle={
    display: 'grid', 
    textAlign: 'center', 
    backgroundColor :'white'
}

function Title(props){
    return <h1 style={{gridArea: 'subtitle', textAlign:'center', marginTop:'45px',color: 'black', fontFamily: 'CalibriRegular', fontSize: '48px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>{props.content}</h1>;
}

function Paragraph(props){
    return <p style={{gridArea: props.gridArea, textAlign:'center', color: props.color, fontFamily: 'CalibriRegular', fontSize: '20px', fontWeight: '400', lineHeight: 'normal'}}>{props.content}</p>;
        
}

function LoginContent(props){

    const divStyle={
        ...intdivStyle,
    }

    return(
        <div className="g-start-2 container-fluid">
            <div style={{...divStyle, gridTemplateAreas: `'subtitle' 'p' 'error' 'username' 'password' 'button'`}}>
                <Title 
                    content={'Connection'}
                />
                <Paragraph 
                    gridArea={'p'}
                    color={'black'}
                    content={'Entrer votre email et mot de passe'}
                />
                <div className="form-floating mb-3 mx-20 p-2">
                     <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={props.usernameOnChange} value={props.usernameValue}/>
                    <label htmlfor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mx-20 p-2">
                      <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={props.passwordOnChange} value={props.passwordValue}/>
                      <label htmlfor="floatingPassword">Password</label>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto" style={{gridArea: 'button'}}>
                    <button type="button" className="btn btn-link" style={{textAlign:'center', fontFamily: 'CalibriRegular', fontSize: '20px',fontWeight: '400'}} onClick={props.handleForgotPassword}>Forgot Password?</button>
                    <button type="button" className='btn btn-primary btn-lg mb-5' style={{textAlign:'center', border:'none', fontFamily: 'CalibriRegular', fontSize: '20px',fontWeight: '400'}} onClick={props.loginHandle}>Login</button>
                </div>
            </div>
        </div>
    );
}

export {LoginContent, Paragraph, Title};