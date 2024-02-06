import React from 'react';
import InputLogin from './InputLoginPage';
import Button from './ButtonLoginPage';

const intdivStyle={
    display: 'grid', 
    textAlign: 'center', 
    backgroundColor :'white'
}



function LoginContent(props){

    const divStyle={
        ...intdivStyle,
        gridArea: props.content,
    }

    function Title(props){
        return <h1 style={{gridArea: 'subtitle', textAlign:'center', marginTop:'45px',color: 'black', fontFamily: 'CalibriRegular', fontSize: '48px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>{props.content}</h1>;
    }
    
    function Paragraph(props){
        return <p style={{gridArea: props.gridArea, textAlign:'center', marginTop:'30px', marginBottom:'50px', color: props.color, fontFamily: 'CalibriRegular', fontSize: '20px', fontWeight: '400', lineHeight: 'normal'}}>{props.content}</p>;
            
    }

    if(props.forgotPassword === true){

        return(
            <div style={{...divStyle,gridTemplateAreas: `'subtitle' 'p' 'mail' 'send'`}}>
                <Title 
                    content={'Reset Password'}
                />
                <Paragraph 
                    gridArea={'p'}
                    color={'black'}
                    content={'Please enter your username and password'}
                />
                <InputLogin 
                    gridArea={'mail'}
                    value={props.usernameValue} 
                    type={'text'}
                    placeholder={"Username"}
                    onChange={props.usernameOnChange}
                    marginBottom={'25px'}
                />
                <Button
                    gridArea={'send'}
                    onClick={props.loginHandle}
                    content={'Send'}
                    marginBottom={'54px'}
                />
            </div>
        );
    }
    else{
        if(props.loginError){

            return(
                <div style={{...divStyle, gridTemplateAreas: `'subtitle' 'p' 'pAlert' 'username' 'password' 'forgot' 'login'`}}>
                    <Title 
                        content={'Login'}
                    />
                    <Paragraph 
                        gridArea={'p'}
                        color={'black'}
                        content={'Please enter your username and password'}
                    />
                    <Paragraph 
                        gridArea={'pAlert'}
                        color={'red'}
                        content={'Invalid Password or Login'}
                    />
                    <InputLogin 
                        gridArea={'username'}
                        value={props.usernameValue} 
                        type={'text'}
                        placeholder={"Username"}
                        onChange={props.usernameOnChange}
                        marginBottom={'25px'}
                    />
                    <InputLogin 
                        gridArea={'password'}
                        value={props.passwordValue} 
                        type={'password'}
                        placeholder={"Password"}
                        onChange={props.passwordOnChange}
                        marginTop={'25px'}
                    />
                    <button style={{gridArea: 'forgot', textAlign:'center',  margin :'25px auto', border:'none', background:'none', fontFamily: 'CalibriRegular', fontSize: '20px',fontWeight: '400', textDecorationLine:'underline'}} onClick={props.handleForgotPassword}>Forgot Password?</button>
                    <Button
                        gridArea={'login'}
                        onClick={props.loginHandle}
                        content={'Login'}
                        marginBottom={'54px'}
                    />
                </div>
            );
        }

        return(
            <div style={{...divStyle, gridTemplateAreas: `'subtitle' 'p' 'username' 'password' 'forgot' 'login'`}}>
                <Title 
                    content={'Login'}
                />
                <Paragraph 
                    gridArea={'p'}
                    color={'black'}
                    content={'Please enter your username and password'}
                />
                <InputLogin 
                    gridArea={'username'}
                    value={props.usernameValue} 
                    type={'text'}
                    placeholder={"Username"}
                    onChange={props.usernameOnChange}
                    marginBottom={'25px'}
                />
                <InputLogin 
                    gridArea={'password'}
                    value={props.passwordValue} 
                    type={'password'}
                    placeholder={"Password"}
                    onChange={props.passwordOnChange}
                    marginTop={'25px'}
                />
                <button style={{gridArea: 'forgot', textAlign:'center',  margin :'25px auto', border:'none', background:'none', fontFamily: 'CalibriRegular', fontSize: '20px',fontWeight: '400', textDecorationLine:'underline'}} onClick={props.handleForgotPassword}>Forgot Password?</button>
                <Button
                    gridArea={'login'}
                    onClick={props.loginHandle}
                    content={'Login'}
                    marginBottom={'54px'}
                />
            </div>
        );
    }
}

export default LoginContent;