const Info = (props) => {

    return (
        <div style={props.style}>
            {props.existingInternship ? (
                    <>
                        <h1 style={{textAlign:'center',color: 'black', fontFamily:'CalibriRegular', fontSize:'35px', fontWeight: '400'}}>{props.title}</h1>
                        {props.keys.map((keyObj) => {
                            const descriptionKeyObj = props.descriptionKeys.find((descKeyObj) => descKeyObj.type === keyObj.type);
                            return keyObj.keys.map((key, index) => (
                                <p key={key}>
                                    {descriptionKeyObj.keys[index]} : {props.getNestedValue(data, key)}
                                </p>
                            ));
                        })}
                    </>
                ):(
                    <>
                        <h1 style={{textAlign:'center',color: 'grey', fontFamily:'CalibriRegular', fontSize:'35px', fontWeight: '400'}}>Revenez bientôt</h1>
                    </>
                )
            };
        </div>

    );

};

export default Info;