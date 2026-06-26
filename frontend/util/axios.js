import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080"
});

const token = localStorage.getItem("token");

if(token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export default instance;