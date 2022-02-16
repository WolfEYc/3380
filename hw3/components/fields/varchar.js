import { Form, Row } from "react-bootstrap";

const Varchar = ({ onChange, id, length }) => {

    const handleChange = (e) => {
        onChange(e.target.value);
    }

    return (
        <Form.Control className="mb-3" type="text" id={id} onChange={handleChange} maxLength={length} key={id} placeholder={id}/>
    )

}

export default Varchar;
