import Button from "../Login/ButtonLoginPage";
import fileIcon from "../../assets/fileIcon.svg";

const renderContent = (props) => {
    switch (props.selectedButton){
        case 0 :
            return <div style={{ margin: '45px 35px', height: '431px', width: '100%', borderRadius: '10px', border: '4px dashed #356084', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={fileIcon} style={{ width: '100px', height: '100px' }} />
                        <h1 style={{ color: '#000', fontFamily: 'CalibriRegular', fontSize: '36px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', marginTop: '20px' }}>Drag and drop or <span style={{color: '#00AEEF'}}>Choose</span> a file to upload</h1>
                        <h3 style={{color: '#6B6B6B', fontFamily: 'CalibriRegular', fontSize: '24px', fontStyle: 'normal', fontWeight: '400',lineHeight: 'normal'}}>Supported format : json,xls </h3>
                    </div>;
        
        case 1 : 
            return <div style={{margin:'45px 35px',height: '431px', width:'100%', borderRadius: '10px',border: '4px dashed  #356084', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{color: '#000', fontFamily: 'CalibriRegular', fontSize: '36px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>Choose the format to export the data :</h1>
                    <fieldset style={{border:'none'}}>
                        <div>
                            <input type="radio" name="file" value="Json" style={{width: '20px', height: '20px', fill:'#D9D9D9'}}/> <label for="Json" style={{color: '#000', fontFamily: 'CalibriRegular', fontSize: '36px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>Json</label>
                        </div>

                        <div>
                            <input type="radio" name="file" value="Excel" style={{width: '20px', height: '20px', fill:'#D9D9D9'}}/> <label for="Excel" style={{color: '#000', fontFamily: 'CalibriRegular', fontSize: '36px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>Excel</label>
                        </div>
                    </fieldset>
                </div>;
    }
}

const Impxport = (props) => {
    return(
        <div style={{margin:'78px 70px', gridTemplateAreas:`'content content content' '. . button'`,borderRadius: '20px', background: '#D9D9D9', padding:'10px'}}>
            <div style={{gridArea:'content', display:'flex', margin:'10px 20px', height:'520px',background:'white',borderRadius:'20px'}}>
                {props.selectedButton !== undefined && renderContent(props)}
            </div>
            <div style={{ gridArea: 'button', display: 'grid',gridTemplateAreas:'Cancel content', justifyContent: 'end', marginTop: 'auto' }}>
                <div style={{gridArea:'Cancel'}}>
                    <Button content={'Cancel'} 
                    />
                </div>
                <div style={{marginLeft:'40px',gridArea:'content'}}><Button content={props.content}/></div>
            </div>
    </div>
    );

}

export default Impxport;