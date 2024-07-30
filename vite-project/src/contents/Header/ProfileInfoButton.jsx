import icon from '../../assets/icon.svg'
import logout from '../../assets/logoutIcon.svg'

const ProfileInfoButton = (props) => {
    const data = props.data;
    return(
        <div style={{gridTemplateColumns: 'auto auto auto',display:'flex', marginLeft:'auto', marginRight:'0'}}>
            {props.profileInfo?
            (<>
                <ul class="navbar-nav me-auto">
                <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{fontFamily: "CalibriRegular", fontSize: '20px',textAlign: 'center',fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>
                            {data.first_name} {data.last_name}
                        </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#" onClick={props.handleLogOutClick}> Déconnexion <img src={logout} style={{width: '15px',height: '15px',marginLeft:'auto'}}/></a></li>
                    </ul>
                </li>
                </ul>
            </>):(<>
                <a className="dropdown-item" href="#" onClick={props.handleLogOutClick}><img src={logout} style={{width: '20px',height: '20px',marginLeft:'auto'}}/> Déconnexion</a>
            </>)}
        </div>
    );
}

export default ProfileInfoButton;