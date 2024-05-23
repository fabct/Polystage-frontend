const ContentTitle = (props) => {
        if(props.isAdding){
            return(
                <h1 style={{textAlign:'center',fontFamily: 'CalibriRegular',fontStyle: 'normal', margin:'10px'}}>
                    {props.isAddingTitle}
                </h1>
            );
        }
        else{
            return(
                <>
                    <h1 style={{textAlign:'center',fontFamily: 'CalibriRegular',fontStyle: 'normal', margin:'10px'}}>
                    {props.researchTitle}
                    </h1>
                    <div style={{display:'flex',textAlign:'center',textAlign:'center',fontFamily: 'CalibriRegular',fontStyle: 'normal'}}> 
                        <div style={{flex: 1, margin: 'auto'}}>{props.Cell1}</div>
                        <div style={{flex: 1, margin: 'auto'}}>{props.Cell2}</div>
                        <div style={{flex: 1, margin: 'auto'}}>{props.Cell3}</div>
                        <div style={{flex: 1, margin: 'auto'}}>{props.Cell4}</div>
                        <div style={{flex: 1, margin: 'auto'}}>{props.Cell5}</div>
                        <div style={{flex: 1, margin: 'auto'}}>{props.Cell6}</div>
                    </div>
                </>
            );
        }
}

export default ContentTitle;