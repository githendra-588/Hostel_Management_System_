import axios from "axios";

export const url = 'http://localhost:4000/';
const AxiosInstance = axios.create({
    baseURL: url,
}
)

export default AxiosInstance;