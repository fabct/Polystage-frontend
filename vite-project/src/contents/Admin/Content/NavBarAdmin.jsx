import ButtonNavBar from "./Element/ButtonNavBar";
import userLogo from "../../../assets/user.svg";
import promoLogo from "../../../assets/promo.svg";
import stageLogo from "../../../assets/stage.svg";
import formulaireLogo from "../../../assets/form.svg";
import importLogo from "../../../assets/import.svg";
import exportLogo from "../../../assets/export.svg";
import groupLogo from "../../../assets/group.svg";
import emailLogo from "../../../assets/email.svg";



const NavBarAdmin = (props) => {

    const buttonName = [" User"," Session"," Jury"," Stage"," Formulaire"," Email"," Import"," Export"];
    const buttonLogo = [userLogo, promoLogo, groupLogo ,stageLogo, formulaireLogo, emailLogo,importLogo, exportLogo];

    return(
        <div style={{display: 'flex', flexDirection: 'column', flexShrink:'0',margin:'0 auto'}}>
            {Array.from({ length: buttonName.length }, (_, index) => (
                <ButtonNavBar 
                    key={index}
                    logo={buttonLogo[index]}
                    title={buttonName[index]}
                    isSelected={props.selectedButton === index}
                    onClick={() => props.onClick(index)}
                />
            ))}
        </div>
    );
}

export default NavBarAdmin;
