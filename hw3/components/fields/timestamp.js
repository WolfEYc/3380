import { useState } from "react"
import { Form, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const Timestamp = ({ onChange, id }) => {

    const [startDate, setStartDate] = useState(new Date());

    const handleChange = (date) => {
        setStartDate(date);
        onChange(date)
    }
    

    return (
        <Form.Group className="mb-3">
            <Form.Label className="form-check-label" htmlFor={id}>
                {id}
            </Form.Label>
            <ReactDatePicker selected={startDate} onChange={handleChange} showTimeSelect dateFormat="Pp" id={id} key={id} />
        </Form.Group>
    )

}

export default Timestamp;
