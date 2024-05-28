import fileIcon from '../../assets/fileIcon.svg';

const DragDrop = (props) => {
    return(
    <div style={props.style}>
        <h1 style={{textAlign:'center' ,margin:'25px 47px', color: 'black', fontFamily: 'CalibriRegular', fontSize: '35px', fontWeight: '400'}}>{props.title}</h1>
        <div style={{margin:'10px' ,border:'4px dashed #356084',borderRadius:'10px',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <img src={fileIcon} style={{marginTop:'20px',height:'50px',width:'50px'}}/>
            <h1 style={{ color: '#000', fontFamily: 'CalibriRegular', fontSize: '20px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', marginTop: '20px' }}>Drag and drop or <span style={{color: '#00AEEF'}}>Choose</span> a file to upload</h1>
            <h1 style={{fontSize:'16px', fontFamily:'CalibriRegular',color:'#6b6b6b', fontWeight:'400',fontStyle:'normal'}}>Supported format : pdf</h1>
        </div>
    </div>
    );
};

export default DragDrop;