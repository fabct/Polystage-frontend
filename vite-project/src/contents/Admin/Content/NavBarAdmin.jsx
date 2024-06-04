import ButtonNavBar from "./Element/ButtonNavBar";
import userLogo from "../../../assets/user.svg";
import promoLogo from "../../../assets/promo.svg";
import stageLogo from "../../../assets/stage.svg";
import formulaireLogo from "../../../assets/form.svg";
import importLogo from "../../../assets/import.svg";
import exportLogo from "../../../assets/export.svg";



const NavBarAdmin = (props) => {

    const buttonName = [" User", " Promo", " Stage", " Formulaire", " Import", " Export"];
    const buttonLogo = [userLogo, promoLogo, stageLogo, formulaireLogo, importLogo, exportLogo];

    return(
        <div style={{display: 'flex', flexDirection: 'column', flexShrink:'0',margin:'0 auto'}}>
            {Array.from({ length: 6 }, (_, index) => (
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
