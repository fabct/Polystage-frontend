import InputSearch from './InputSearch'
import { useState } from 'react';
import SearchButton from './SearchButton';
import Button from '../Login/ButtonLoginPage';

const SearchContent = (props) => {

    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
  
    const handleBirthDateChange = (e) => {
        setBirthDate(e.target.value);
    }; 

    const handleSearch = () => {
        console.log(firstName);
        console.log(name);
        console.log(birthDate);
    }

    return(
        <div style={{margin:'78px 70px', gridTemplateAreas:`'search . .' 'result result result' '. . button'`,borderRadius: '20px', background: '#D9D9D9', padding:'10px'}}>
            <div style={{gridArea:'search', margin:'20px 20px', borderRadius: '20px', background:'white', display:'inline-block'}}>
                <div style={{padding: '10px 10px 0px 10px', margin:'10px',display: 'flex'}} > 
                    <h1 style={{margin:'0',color: '#000', fontFamily: 'CalibriRegular', fontSize: '24px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>First name :</h1>
                    <InputSearch 
                        onChange = {handleFirstNameChange}
                        marginLeft={'15px'}
                        type={'text'}
                    />
                </div>
                <div style={{padding: '2px 10px',margin:'10px' ,display: 'flex'}}> 
                    <h1 style={{margin:'0',color: '#000', fontFamily: 'CalibriRegular', fontSize: '24px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>Name :</h1>
                    <InputSearch 
                        onChange = {handleNameChange}
                        marginLeft={'15px'}
                        type={'text'}
                    />
                </div>
                <div style={{padding: '0px 10px 10px 10px',margin:'10px',display: 'flex'}}>
                    <h1 style={{margin:'0',color: '#000', fontFamily: 'CalibriRegular', fontSize: '24px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>Birth date :</h1>
                    <InputSearch 
                        onChange = {handleBirthDateChange}
                        marginLeft={'15px'}
                        type={'date'}
                    />
                    <SearchButton 
                        onClick={handleSearch}
                    />
                </div>
            </div>
            <div style={{gridArea:'result', margin:'10px 20px', height:'325px',background:'white',borderRadius:'20px'}}>
                <table>
                    <tbody id={props.content}>
                    </tbody>
                </table>
            </div>
            <div style={{ gridArea: 'button', display: 'flex'}}>
                <Button
                    content={'Add'}
                />
            </div>
        </div>
    );
}

export default SearchContent;