import axios from "axios";

const axiosInstance = axios.create({
    baseURL : 'http://localhost:8000'
})

axios.interceptors.request.use(config=>{
    const jwtToken = JSON.parse(localStorage.getItem('jwt')!) 
    config.headers.authorization = `Bearer ${jwtToken}`
    return config
})

export default axiosInstance