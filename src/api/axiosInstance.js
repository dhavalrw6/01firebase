import axios from "axios";

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_DATABASE_URL+'books.json'
});

export default axiosInstance;