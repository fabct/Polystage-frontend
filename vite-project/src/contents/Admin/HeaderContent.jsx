import logo from '../../assets/1200px-Univ_Aix-Marseille_-_Polytech.svg.png';
import ProfileInfoButton from './ProfileInfoButton';

const HeaderContent = (props) => {

    return(
        <div style={{gridArea:props.gridArea, margin:'0',display: 'grid', gridTemplateColumns: 'auto auto', background: '#FFF', height: '100px', padding: '14px 51px 15px 51px', gap: '13px', flexShrink: '0', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.50)'}}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} style={{ width: '196px', height: '77px', flexShrink: '0' }} />
                    <div style={{ margin: '0 15px', width: '3px', height: '71px', flexShrink: '0', background: '#00AEEF' }}></div>
                    <h1 style={{ margin: '15px 0', color: '#003865', fontFamily: 'CalibriRegular', fontSize: '36px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal' }}>Internship Manager</h1>
                </div>
                <ProfileInfoButton />
        </div>
    );
}

export default HeaderContent;