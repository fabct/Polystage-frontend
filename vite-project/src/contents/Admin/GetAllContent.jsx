import Button from '../Login/ButtonLoginPage';

const AllContent = (props) => {
    return(
        <div style={{margin:'78px 70px', gridTemplateAreas:`'content content content' '. . button'`,borderRadius: '20px', background: '#D9D9D9', padding:'10px'}}>
            <div style={{gridArea:'result', margin:'10px 20px', height:'520px',background:'white',borderRadius:'20px'}}>
                <table>
                    <tbody id={props.content}>
                    </tbody>
                </table>
            </div>
            <div style={{ gridArea: 'button', display: 'flex'}}>
                <Button
                    content={'Add'}
                />
            </div>
        </div>
    );

}

export default AllContent;