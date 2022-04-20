import axios from "axios";

const http = axios.create({
    baseURL: "http://192.168.100.4:8090/products",
})

export { http };
