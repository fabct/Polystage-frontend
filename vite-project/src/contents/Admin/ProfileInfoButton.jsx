import icon from '../../assets/icon.svg'
import logout from '../../assets/logoutIcon.svg'

const ProfileInfoButton = () => {
    return(
        <div style={{gridTemplateColumns: 'auto auto auto',display:'flex',margin:'10px', marginLeft:'auto', marginRight:'0', width: '300px', height: '80px', borderRadius: '50px',background: '#003865'}}>
            <div style={{display:'flex', padding:'15px 10px'}}>
                <img src={icon} style={{width: '50px', height: '50px'}}/>
                <h1 style={{fontFamily: "CalibriRegular", fontSize: '20px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', color:'white', marginLeft:'10px'}}>Dupond Dupond</h1>
            </div>
            <div style={{display:'flex', width: '3px', height: '80px', flexShrink: '0', background:'#011F38'}}></div>
            <div style={{display: 'flex', width: '64px', height: '80px', padding: '0 5px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexShrink: '0'}}>
                <img src={logout} style={{width: '35px',height: '35px'}}/>
            </div>
        </div>
    );
}

export default ProfileInfoButton;