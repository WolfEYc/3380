import axios from "axios";

const submitAPI = (endpoint, data, cb = (res) => {}) => {
    axios.post(`/api/${endpoint}`, data)
    .then((res) => {
        cb(res);
    })
    .catch((err) => {
        cb(err);
    })

}

export default submitAPI;