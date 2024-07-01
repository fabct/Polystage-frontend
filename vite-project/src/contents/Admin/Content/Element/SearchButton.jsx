import searchIcon from '../../../../assets/searchIcon.svg';

const SearchButton = (props) => {
    return(
        <button id="connecter" style={{border:'none', background:'none',alignContent:'center'}} onClick={props.onClick}>
            <img src={searchIcon} />
        </button>
    );  
}

export default SearchButton;