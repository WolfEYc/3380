import TransactionSelector from '../components/layouts/transactionSelector'
import TransactionFields from '../components/layouts/transactionFields'
import { useState, useRef } from 'react'
import { Table } from 'react-bootstrap';


const Transactor = () => {

    const typeChange = useRef(null);
    const submit = useRef(null);

    const [state, setState] = useState({
        type: "Assign Clean Shift"
    })

    const [response, setResponse] = useState({ data: "" });

    const switchTransactionType = (type) => {
        state.type = type;
        typeChange.current(state.type);
        console.log(state.type)
    }

    const onResponse = (res) => {

        

        if(res.data !== undefined){
            res = res.data
        }

        console.log(res)
        /*
        setResponse({ data: JSON.stringify(res.data)});
        console.log(response.data)
        */
        
        setResponse({ data: JSON.stringify(res).split("\\n")});
        
    }

   const handleSubmit = () => {
       submit.current();
   }

    return (
        <>
        <Table className="main-table">
            <tbody>        
                <tr>    
                <td width="50%" valign="top">
                    <Table>
                        <tbody>
                            <tr>
                                <td width="80%">
                                    <TransactionFields typeChange={typeChange} type={state.type} onResponse={onResponse} handleSubmit={submit} />
                                </td>
                                <td width="25%" valign="top">
                                    <TransactionSelector onSwitch={switchTransactionType} onSubmit={handleSubmit}/>
                                </td> 
                            </tr>
                        </tbody>                   
                    </Table>
                </td>
                <td width="1%"></td>
                <td width="50%">
                    <textarea readOnly className="form-control" id="response-area" rows="50" style={{ background: "black", color: "white"}} value={response.data}/>
                </td>
                </tr>
            
            </tbody>
        </Table>
        </>
    )
    
}

export default Transactor;