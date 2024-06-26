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
                <div style={{boxShadow: '0px 4px 4px #00000040', margin:'auto'}}>
                    <h1 style={{textAlign:'center',fontFamily: 'CalibriRegular',fontStyle: 'normal'}}>
                    {props.researchTitle}
                    </h1>
                    {props.isSearching ? (
                    <div style={{margin:'10px',display:'flex',textAlign:'center',textAlign:'center',fontFamily: 'CalibriRegular',fontStyle: 'normal'}}> 
                        {
                            props.inputs.map((input, index) => (
                                <div key={index} style={{flex: 1, margin: 'auto'}}>{input.name}</div>
                            ))
                        }
                    </div>
                    ):(
                        <></>
                    )}
                </div>
            );
        }
}

export default ContentTitle;