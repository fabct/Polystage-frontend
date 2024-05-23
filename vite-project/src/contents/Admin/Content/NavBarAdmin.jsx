import ButtonNavBar from "./Element/ButtonNavBar";


const NavBarAdmin = (props) => {

    const buttonName = ["User", "Promo", "Stage", "Formulaire", "Import", "Export"];

    return(
        <div style={{gridTemplateColumns:'reapeat(6,auto)',width: '1318px', height: '90px', flexShrink:'0', borderRadius: '30px',margin:'0 auto', background:'#14AEEF'}}>
            {Array.from({ length: 6 }, (_, index) => (
                <ButtonNavBar 
                    key={index}
                    title={buttonName[index]}
                    isSelected={props.selectedButton === index}
                    onClick={() => props.onClick(index)}
                />
            ))}
        </div>
    );
}

export default NavBarAdmin;
