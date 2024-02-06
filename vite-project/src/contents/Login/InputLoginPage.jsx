import React from 'react';

const inputStyle = {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '400px',
    height: '70px',
    borderRadius: '20px',
    border: '3px solid #003865',
    fontFamily: 'CalibriRegular',
    fontSize: '32px',
    fontWeight: '400'
};

// ...props = gridArea value, type value, placeholder value, value useState, onChange function  
function InputLogin(props){

        let gridArea = props.gridArea;
        let marginBottom = props.marginBottom;
        let marginTop = props.marginTop
        const propsStyle ={
            ...inputStyle,
            marginBottom : marginBottom,
            marginTop : marginTop,
            gridArea : gridArea
        }


        return(
            <input 
                style={propsStyle}
                type={props.type} 
                placeholder={props.placeholder} 
                value={props.value} 
                onChange={props.onChange}   
            />
        );
}

export default InputLogin;