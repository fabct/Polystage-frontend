import icon from '../../assets/icon.svg'
import logout from '../../assets/logoutIcon.svg'

const ProfileInfoButton = (props) => {
    const data = props.data;
    return(
        <div style={{gridTemplateColumns: 'auto auto auto',display:'flex',margin:'10px', marginLeft:'auto', marginRight:'0', width: '300px', height: '80px', borderRadius: '50px',background: '#003865'}}>
            <div style={{display:'flex', margin: 'auto'}}>
                <div style={{margin: '10px 10px'}}>
                    <img src={icon} style={{width: '50px', height: '50px'}}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <h1 style={{fontFamily: "CalibriRegular", fontSize: '20px',textAlign: 'center',fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', color:'white'}}>{data.first_name} {data.last_name}</h1>
                </div>

            </div>
            <div style={{display:'flex', width: '3px', height: '80px', flexShrink: '0', background:'#011F38'}}></div>
            <div style={{display: 'flex', width: '64px', height: '80px', padding: '0 5px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexShrink: '0'}} onClick={props.handleLogOutClick}>
                <img src={logout} style={{width: '35px',height: '35px'}}/>
            </div>
        </div>
    );
}

export default ProfileInfoButton;