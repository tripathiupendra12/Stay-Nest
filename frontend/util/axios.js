import axios from "axios";

const instance = axios.create({
    baseURL: "https://stay-nest-ph9a.onrender.com"
});

const token = localStorage.getItem("token");

if(token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export default instance;