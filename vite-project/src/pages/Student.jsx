import '../index.css'
import HeaderContent from '../contents/Admin/HeaderContent';
import check from '../assets/Check.svg'

const StudentPage = () => {
    return(
        <div style={{gridTemplateArea:`'header header header' 'body body body'`, background: '#E6E6E6',height:'100%'}}>
            <HeaderContent 
                gridArea={'header'}
            />
            <div style={{gridArea:'body', gridTemplateRows:'auto auto',height:'100%'}}>
                <div style={{ position: 'relative' }}>
                    {/* Div 1 */}
                    <div style={{padding:'20px',height: '50px', backgroundColor: '#003865' }}>
                        <h1 style={{margin:'0', textAlign:'center', fontSize:'48px', fontFamily:'CalibriRegular', color:'white'}}> Welcome Back Dupond Dupond</h1>
                    </div>
      
                    {/* Div 2 */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto', gridTemplateRows: 'auto auto auto', gap: '10px', padding: '20px' }}>
                        <div style={{ margin:'0 10px',gridColumn:'1/2', gridRow:'1/2', borderRadius:'20px',background:'white',padding: '10px' }}>
                            <h1 style={{textAlign:'center',color: 'black', fontFamily:'CalibriRegular', fontSize:'35px', fontWeight: '400'}}>Internship</h1>
                            <p style={{margin:'10px 30px',color: 'black', fontFamily:'CalibriRegular', fontSize:'20px', fontWeight: '400'}}> Company : Lorem Ipsum </p>
                            <p style={{margin:'10px 30px',color: 'black', fontFamily:'CalibriRegular', fontSize:'20px', fontWeight: '400'}}> Subject : Lorem Ipsum sidae lorem ipsum</p>
                            <p style={{margin:'10px 30px',color: 'black', fontFamily:'CalibriRegular', fontSize:'20px', fontWeight: '400'}}> Dates begin : 10/04/2024 </p>
                            <p style={{margin:'10px 30px',color: 'black', fontFamily:'CalibriRegular', fontSize:'20px', fontWeight: '400'}}> Dates End : 31/08/2024</p>
                        </div>
                        <div style={{margin:'0 10px',gridColumn:'2/3', gridRow:'1/2', borderRadius:'20px',background:'white', padding: '10px' }}>
                            <h1 style={{textAlign:'center',color: 'black', fontFamily:'CalibriRegular', fontSize:'35px', fontWeight: '400'}}>Convocation</h1>
                            <p style={{margin:'10px 30px',color: 'black', fontFamily:'CalibriRegular', fontSize:'20px', fontWeight: '400'}}> Date : 10/09/2024</p>
                            <p style={{margin:'10px 30px',color: 'black', fontFamily:'CalibriRegular', fontSize:'20px', fontWeight: '400'}}> Heure : 11h</p>
                        </div>
                        <div style={{ margin: '0 10px', gridColumn: '3', gridRow: '1/2', borderRadius: '20px', background: 'white', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <h1 style={{margin:'20px',textAlign: 'center',alignSelf: 'center', color: 'black', fontFamily: 'CalibriRegular', fontSize: '35px', fontWeight: '400' }}>Resultat</h1>
                            <img src={check} style={{ alignSelf: 'center'}} />
                            <h1 style={{textAlign:'center',color: 'black', fontFamily: 'CalibriRegular',fontSize: '35px' ,fontWeight: '400'}}>12/20</h1>
                        </div>
                        <div style={{ margin: '0 10px', gridColumn: '1/4', gridRow: '2/3', borderRadius: '20px', background: 'white', padding: '10px', display: 'grid',gridTemplateColumns: 'auto auto auto'}}>
                            <div style={{gridColumn:'1/2'}}>
                                <h1 style={{margin: '25px 47px', color: 'black', fontFamily: 'CalibriRegular', fontSize: '35px', fontWeight: '400' }}>Formulaire auto évaluation</h1>
                            </div>
                            <div style={{gridColumn:'3/4', display:'flex'}}>
                                <h1 style={{margin:'25px 47px', color: 'black', fontFamily: 'CalibriRegular', fontSize: '35px', fontWeight: '400'}}>Limit date : 20/08/2024</h1>
                                <div style={{margin:'5px auto'}}>
                                    <img src={check} style={{ alignSelf: 'center', height: '40px',width: '40px'}} />
                                    <p style={{textAlign:'center', margin:'2px', color: 'black', fontFamily: 'CalibriRegular', fontSize: '25px', fontWeight: '400'}}>Do</p>
                                </div>
                            </div>
                        </div>
                        <div style={{margin:'5px 10px' ,gridColumn:'1/2', gridRow:'3', borderRadius:'20px',background:'white', padding: '10px' }}>
                            Rapport
                        </div>
                        <div style={{margin:'0 10px' ,gridColumn:'3/4', gridRow:'3', borderRadius:'20px',background:'white', padding: '10px' }}>
                            Présentation
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentPage;