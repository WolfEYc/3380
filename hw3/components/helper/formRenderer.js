import transactorTypes from "./types"
import { useState, useEffect } from "react"
import Boolean from "../fields/boolean";
import Integer from "../fields/integer";
import Varchar from "../fields/varchar";
import Timestamp from "../fields/timestamp";
import useConstructor from "./constructor";
import pgFormatDate from "./dateToPgTimestamp";



const FormRenderer = ({ formsChange, type, onSubmit, handleSubmit }) => {

    
    useEffect(() => {
        formsChange.current = onFormsChange
        handleSubmit.current = onhandleSubmit
    })

    const onFormsChange = (type) => {
        renderFields(type);
    }

    const [state, setState] = useState({
        type: type,
        inputs: [],
        listeners: [],
        values: new Map()
    });

    const onhandleSubmit = () => {
        onSubmit(state.type, state.values);
    }

    const renderFields = (type) => {
        
        const inputs = [], listeners = [], values = new Map();
        
        for(const field of transactorTypes[type].fields){
            let listener;
            switch (field.type) {
                
                case 'BOOLEAN':   
                    values.set(field.param, false); 
                    listener = (val) => { values.set(field.param, val) }               
                    listeners.push(listener)
                    inputs.push(<Boolean id={field.param} onChange={listener} key={field.param}/>);
                    break;
                
                case 'INTEGER':
                    values.set(field.param, 0); 
                    listener = (val) => { values.set(field.param, val) }               
                    listeners.push(listener)
                    inputs.push(<Integer id={field.param} onChange={listener} key={field.param} />);
                    break;
                
                case 'VARCHAR':
                    values.set(field.param, ""); 
                    listener = (val) => { values.set(field.param, val) }               
                    listeners.push(listener)
                    inputs.push(<Varchar id={field.param} onChange={listener} key={field.param} length={field.len} />);
                    break;

                case 'TIMESTAMP':
                    values.set(field.param, pgFormatDate(new Date())); 
                    listener = (val) => { values.set(field.param, pgFormatDate(val)) }               
                    listeners.push(listener)
                    inputs.push(<Timestamp id={field.param} onChange={listener} key={field.param} />);
                    break;
                
                default:
                    console.error(`${field.type} is not permitted`);
                
            }
        }

        

        setState({type: type, inputs: inputs, listeners: listeners, values: values});

    }

    
    useConstructor(() => {
        renderFields(type);
    })
    

    return (
        <div>
            {state.inputs}          
        </div>
    )

}  

export default FormRenderer;