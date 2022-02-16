import { useState } from "react"
import { Form, Row } from "react-bootstrap";

const Boolean = ({ onChange, id }) => {

    const [state, setState] = useState(false);

    const handleChange = () => {
        setState(!state);
        onChange(state);
    }

    return (
        <Form.Check type="checkbox" value="" id={id} onChange={handleChange} key={id} label={id} />
    )

}

export default Boolean;
