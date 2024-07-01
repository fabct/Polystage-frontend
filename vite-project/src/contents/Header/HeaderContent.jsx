import logo from '../../assets/1200px-Univ_Aix-Marseille_-_Polytech.svg.png';
import polystage from '../../assets/Polystage_Logo.png';
import ProfileInfoButton from './ProfileInfoButton';

const HeaderContent = (props) => {

    return(
        <div style={{gridArea:props.gridArea, margin:'0',display: 'grid', gridTemplateColumns: 'auto auto', background: '#FFF', height: 'fit-content', padding: '0px 51px', gap: '13px', flexShrink: '0', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.50)'}}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} style={{ width: '196px', height: '77px', flexShrink: '0' }} />
                    <div style={{ margin: '0 15px', width: '3px', height: '71px', flexShrink: '0', background: '#00AEEF' }}></div>
                    <img src={polystage}/>
                </div>
                <ProfileInfoButton 
                    handleLogOutClick ={props.handleLogOutClick}
                    data={props.data}
                />
        </div>
    );
}

export default HeaderContent;