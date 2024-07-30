import logo from '../../assets/1200px-Univ_Aix-Marseille_-_Polytech.svg.png';
import polystage from '../../assets/Polystage_Logo.png';
import ProfileInfoButton from './ProfileInfoButton';

const HeaderContent = (props) => {

    return(
        <div style={{gridArea:props.gridArea, margin:'0',display: 'grid', gridTemplateColumns: 'auto auto', background: '#FFF', padding: '0px 20px', gap: '13px', flexShrink: '0', alignItems:'center'}}>
                <div style={{ display: 'flex',margin:'10px 0',height:'60px'}}>
                    <img src={polystage}/>
                </div>
                <ProfileInfoButton 
                    handleLogOutClick ={props.handleLogOutClick}
                    data={props.data}
                    profileInfo={props.profileInfo}
                />
        </div>
    );
}

export default HeaderContent;