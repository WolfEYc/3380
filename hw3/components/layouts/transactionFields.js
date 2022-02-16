import { useState, useEffect, useRef } from "react";
import submitAPI from "../helper/axiosSubmit";
import transactorTypes from "../helper/types";
import FormRenderer from "../helper/formRenderer";


const TransactionFields = ({ typeChange, type, onResponse, handleSubmit }) => {

    useEffect(() => {
        typeChange.current = onTypeChange
    })

    const formsChange = useRef(null);

    const onTypeChange = (type) => {
        formsChange.current(type);
    }    

    const submit = (type, map) => {

        const endpoint = transactorTypes[type].endpoint;
        
        const data = {}

        for(const [key, val] of map){
            data[key] = val;
        }        

        console.log(endpoint, data);

        submitAPI(endpoint, data, (res) => {
            onResponse(res);
        })
        
        
    }

    return (
        <FormRenderer formsChange={formsChange} type={type} onSubmit={submit} handleSubmit={handleSubmit}/>
    )

}

export default TransactionFields;