import ButtonNavBar from "./Element/ButtonNavBar";
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
                        <ButtonNavBar 
                            key={index}
                            logo={buttonLogo[index]}
                            title={buttonName[index]}
                            isSelected={props.selectedButton === index}
                            onClick={() => props.onClick(index)}
                        />
                    ))}
                </ul>
        </nav>
    );
}

export default NavBarAdmin;
