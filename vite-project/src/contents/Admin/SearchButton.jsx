import searchIcon from '../../assets/searchIcon.svg'

const SearchButton = (props) => {
    return(
        <button style={{marginLeft:'100px' ,border:'none', background:'none'}} onClick={props.onClick}>
            <img src={searchIcon} />
        </button>
    );  
}

export default SearchButton;