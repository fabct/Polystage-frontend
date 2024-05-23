
function ButtonNavBar(props){

    const buttonStyle={
        width: '200px', 
        margin:'15px 7px',
        height: '60px',
        border:'none',
        borderRadius: '40px', 
        backgroundColor: props.isSelected ? '#FFF' :'#129ED9', 
        fontFamily: 'CalibriRegular', 
        fontSize: '36px', 
        fontStyle: 'normal', 
        fontWeight: '400', 
        lineHeight: 'normal', 
        color: '#0B6083',
        boxShadow: props.isSelected ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none'
    }


    return(
        <button 
            style={buttonStyle} 
            onClick={props.onClick}
            >
            {props.title}
        </button>
    );
}

export default ButtonNavBar;