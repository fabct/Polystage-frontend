import React from 'react';
import InputSearch from './Element/InputSearch';
import ModifyButton from './Element/ModifyButton';
import DeleteButton from './Element/DeleteButton';

const RenderContent = (props) => {

    const trStyle = {
        margin: '10px 10px',
        backgroundColor:'white', 
        border: '3px solid rgb(11, 96, 131)', 
        borderRadius: '10px',
        boxShadow: '0px 4px 4px #00000040',
        height: '50px',
        display: 'flex'
    }

    const cellStyle = {textAlign: 'center', fontFamily: 'CalibriRegular', fontStyle: 'normal', flex: 1, margin: 'auto'}; // Add flex: 1 and width: auto

    const cellAddStyle = {margin:'10px', fontFamily: 'CalibriRegular', fontStyle: 'normal', flex: 1}; // Add flex: 1 and width: auto

    return ( props.isAdding ? (
            <div style={{margin: '10px 10px', backgroundColor:'white', border: '3px solid rgb(11, 96, 131)', borderRadius: '10px', boxShadow: '0px 4px 4px #00000040', padding: '10px', display: 'flex'}}>
                <form>
                    {/* Ajoutez vos champs de formulaire ici */}
                    <div style={cellAddStyle}> {props.infoCellAdd1}
                        <InputSearch 
                            onChange = {props.handleChangeCell1}
                            marginLeft={'15px'}
                            type={'text'}
                        />
                    </div>
                    <div style={cellAddStyle}> {props.infoCellAdd2}
                        <InputSearch 
                            onChange = {props.handleChangeCell2}
                            marginLeft={'15px'}
                            type={'text'}
                        />
                    </div>
                    <div style={cellAddStyle}> {props.infoCellAdd3}
                        <InputSearch 
                            onChange = {props.handleChangeCell3}
                            marginLeft={'15px'}
                            type={'text'}
                        />
                    </div>
                    <div style={cellAddStyle}> {props.infoCellAdd4}
                        <InputSearch 
                            onChange = {props.handleChangeCell4}
                            marginLeft={'15px'}
                            type={'password'}
                        />
                    </div>
                    <div style={cellAddStyle}> {props.infoCellAdd5}
                        <InputSearch 
                            onChange = {props.handleChangeCell5}
                            marginLeft={'15px'}
                            type={'password'}
                        />
                    </div>
                    <div style={cellAddStyle}> {props.infoCellAdd6}
                        <select style={{ marginLeft: '10px' }} onChange={props.handleChangeCell6}>
                            <option value="">Sélectionnez un profil</option>
                            <option value="ADM">ADM</option>
                            <option value="ETU">ETU</option>
                            <option value="ENS">ENS</option>
                            <option value="TUT">TUT</option>
                            <option value="PRO">PRO</option>
                        </select>
                    </div>
                    {props.Cells6 === "ETU" ? (
                         <>
                            <div style={cellAddStyle}> {props.infoCellAdd7}
                            <InputSearch 
                                            onChange = {props.handleChangeCell6}
                                            marginLeft={'15px'}
                                            type={'text'}
                                        />
                            </div>
                            <div style={cellAddStyle}> {props.infoCellAdd8}
                                <InputSearch 
                                            onChange = {props.handleChangeCell8}
                                            marginLeft={'15px'}
                                            type={'date'}
                                />
                            </div>
                        </>
                    ):(
                        <></>
                    )}
                    
                </form>
                <div style={{alignContent:'end'}}>
                    <button style={{margin:'0px 10px'}} onClick={props.handleCancel}>Annuler</button>
                    <button onClick={props.handleCreate}>Créer</button>
                </div>
            </div>
            ) : (
                <div id={props.content}>
                    {props.data.map((data) => (
                            <div style={trStyle} key={data.id}>
                            {props.editingId === data.id ? (
                                <>
                                    <div style={cellStyle}> {props.infoCellUpdate1}
                                    <input style={{ marginLeft: '5px' }} defaultValue={data.first_name} onChange={props.handleChangeCellUpdate1}/>
                                    </div>
                                    <div style={cellStyle}> {props.infoCellUpdate2}
                                    <input style={{ marginLeft: '5px' }} defaultValue={data.last_name} onChange={props.handleChangeCellUpdate2}/>
                                    </div>
                                    <div style={cellStyle}> {props.infoCellUpdate3}
                                    <input style={{ marginLeft: '5px' }} defaultValue={data.email} onChange={props.handleChangeCellUpdate2}/>
                                    </div>
                                    <div style={cellStyle}> {props.infoCellUpdate4} {data.profile}
                                    </div>
                                    <button style={{margin:'15px 2px'}} onClick={props.handleCancel}>Annuler</button>
                                    <button style={{margin:'15px 2px'}} onClick={props.handleDoModify}>Valider</button>
                            
                                </>
                                ) : (
                                <>
                                <div style={cellStyle}>{data.first_name}</div>
                                <div style={cellStyle}>{data.last_name}</div>
                                <div style={cellStyle}>{data.email}</div>
                                <div style={cellStyle}>{data.profile}</div>
                                <div style={cellStyle}>
                                    <ModifyButton
                                        handleModify={() => props.handleModify(data)}
                                    />
                                </div>
                                <div style={cellStyle}>
                                    <DeleteButton 
                                        id={data.id}
                                        refresh={props.handleSearch}
                                        function={props.function}
                                    />
                                </div>
                                </>
                                )}
                            </div>
                    ))}
                </div>
            )
    );
}

export default RenderContent;