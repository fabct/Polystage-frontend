
function ButtonNavBar(props){

    const buttonStyle={
        margin:'10px 20px',
        border:'none',
        backgroundColor: '#003865', 
        fontFamily: 'CalibriRegular', 
        fontSize: '36px', 
        fontStyle: 'normal', 
        fontWeight: '400', 
        lineHeight: 'normal', 
        textAlign: 'left',
        color: props.isSelected ? '#00AEEF':'#FFF',
        display: 'flex',
        alignItems: 'center',
    }


    return(
        <button 
            style={buttonStyle} 
            onClick={props.onClick}
            >
            <img src={props.logo} style={{marginRight:'15px'}}/>
            {props.title}
        </button>
    );
}

export default ButtonNavBar;