import { Form, Row } from "react-bootstrap";

const Integer = ({ onChange, id }) => {

    const handleChange = (e) => {
        onChange(e.target.value);
    }

    return (

        <Form.Control className="mb-3" type="number" id={id} onChange={handleChange} key={id} placeholder={id}/>            

    )

}

export default Integer;
