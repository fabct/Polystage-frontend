
function ButtonNavBar(props){

    const buttonStyle={
        margin:'10px 0',
        border:'none', 
        backgroundColor: props.isSelected ? '#00AEEF':'#003865', 
        fontFamily: 'CalibriRegular', 
        fontSize: '25px', 
        fontStyle: 'normal', 
        fontWeight: '400', 
        lineHeight: 'normal', 
        textAlign: 'left',
        color: '#FFF',
        display: 'flex',
        alignItems: 'center',
    }


    return(
        <li className="nav-item my-0" style={buttonStyle}>
            <a className="nav-link mx-3 my-2" style={{ "--bs-icon-link-transform": "translate3d(0, -.125rem, 0)" }} aria-current="page" 
                href="#" 
                onClick={props.onClick}
            >
                <img src={props.logo} style={{marginRight:'15px', width:'25px', height:'25px'}}/>
                {props.title}
            </a>
        </li>
    );
}

export default ButtonNavBar;