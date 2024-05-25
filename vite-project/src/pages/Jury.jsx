import HeaderContent from "../contents/Header/HeaderContent";

const Jury = (props) => {
    return(
        <div style={{gridTemplateArea:`'header header header' 'body body body'`, background: '#E6E6E6',height:'100%'}}>
            <HeaderContent 
                gridArea={'header'}
                handleLogOutClick ={props.handleLogOutClick}
                data={null}
            />
            <div style={{gridArea:'body', gridTemplateRows:'auto auto',height:'100%'}}>
                <div style={{ position: 'relative' }}>
                    {/* Div 1 */}
                    <div style={{padding:'20px',height: '50px', backgroundColor: '#003865' }}>
                        <h1 style={{margin:'0', textAlign:'center', fontSize:'48px', fontFamily:'CalibriRegular', color:'white'}}> Welcome Back Dupond Dupond</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jury;
