
const InputSearch = (props) => {
    return(
        <input 
            style={{textAlign:'center', borderRadius: '20px 20px 0px 0px', borderTop:'none', borderLeft:'none', borderRight:'none' ,borderBottom: '3px solid #000', background:'rgba(217, 217, 217, 0.20)', height:'20px', marginLeft:props.marginLeft}} 
            type={props.type} 
            onChange={props.onChange}
        />
    );
}

export default InputSearch;