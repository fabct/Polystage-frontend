import userLogo from "../../../assets/user.svg";
import promoLogo from "../../../assets/promo.svg";
import stageLogo from "../../../assets/stage.svg";
import formulaireLogo from "../../../assets/form.svg";
import importLogo from "../../../assets/import.svg";
import exportLogo from "../../../assets/export.svg";
import groupLogo from "../../../assets/group.svg";
import emailLogo from "../../../assets/email.svg";``
import soutenanceLogo from "../../../assets/soutenance.svg";



const NavBarAdmin = (props) => {

    const buttonName = [" User"," Session"," Jury"," Stage"," Soutenance"," Formulaire"," Email"," Import"," Export"];
    const buttonLogo = [userLogo, promoLogo, groupLogo ,stageLogo,soutenanceLogo ,formulaireLogo, emailLogo,importLogo, exportLogo];
    
    return(
        <nav className="navbar navbar-expand-lg">
                <ul className="flex-column px-0 mx-0">
                    {Array.from({ length: buttonName.length }, (_, index) => (
                        <li className={`button-nav nav-item my-0 ${props.selectedButton === index ? 'selected-button' : ''}`} onClick={() => props.onClick(index)}>
                           <a className="nav-link mx-3 my-2" style={{ "--bs-icon-link-transform": "translate3d(0, -.125rem, 0)" }} aria-current="page" 
                                href="#" 
                            >
                                <img src={buttonLogo[index]} style={{ marginRight: '15px', width: '25px', height: '25px' }} />
                                {buttonName[index]}
                            </a>
                        </li>
                    ))}
                </ul>
        </nav>
    );
}

export default NavBarAdmin;
