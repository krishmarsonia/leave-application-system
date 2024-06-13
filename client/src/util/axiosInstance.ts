import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL

console.log(baseURL);

const axiosInstance = axios.create({ baseURL: baseURL });

export default axiosInstance;
