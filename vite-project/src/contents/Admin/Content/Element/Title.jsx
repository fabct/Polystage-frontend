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
                        {
                            props.inputs.map((input, index) => (
                                <div key={index} style={{flex: 1, margin: 'auto'}}>{input.name}</div>
                            ))
                        }
                    </div>
                </>
            );
        }
}

export default ContentTitle;