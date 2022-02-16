import { useState } from "react"
import bean from 'react/'
import useConstructor from "../helper/constructor"

const TransactionSelector = ({ onSwitch, onSubmit }) => {

    

    const transactionTypes = [
        {type: "Assign Clean Shift"},
        {type: "Assign Maitenence"},
        {type: "Assign Refuel Shift"},
        {type: "Baggage Manager"},
        {type: "Filter Aircraft"},
        {type: "New Flight"},
        {type: "Record Arrival"},
        {type: "Record Departure"},
        {type: "Ticket Checkin"}
    ]

    const [state, setState] = useState({
        options: []
    })

    const formType = (type) => {
        //console.log(type);
        return <option key={type}>{type}</option>
    }


    const loadform = () => {
        for(const transactionType of transactionTypes){
            state.options.push(formType(transactionType.type));
        }
    }

    const onSelectChange = (e) => {
        onSwitch(e.target.value);
    }

    useConstructor(() => {
        loadform();
    })

    return (
        <div>
            <select className="form-select form-select-lg mb-3" style={{"width": "15rem"}} onChange={onSelectChange}>
                { state.options }
            </select>
            <button type="button" className="btn btn-primary" onClick={onSubmit} style={{float: "right"}}>Submit</button>
        </div>
    );
}

export default TransactionSelector;