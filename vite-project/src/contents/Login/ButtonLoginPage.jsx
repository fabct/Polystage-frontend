import React from 'react';

const initButtonStyle = {
    textAlign:'center',  
    marginLeft:'auto', 
    marginRight:'auto', 
    width: '200px',
    height: '70px',
    borderRadius:'20px', 
    border:'3px solid #0B6083', 
    background:'none',
    fontFamily: 'CalibriRegular', 
    fontSize: '32px',
    fontWeight: '400'
};

function Button(props){

    const buttonStyle={
        ...initButtonStyle,
        gridArea: props.gridArea,
        marginBottom:props.marginBottom,
        marginTop:props.marginTop
    }

    return(
        <button style={buttonStyle} onClick={props.onClick}>
            {props.content}
        </button>
    );
}

export default Button;