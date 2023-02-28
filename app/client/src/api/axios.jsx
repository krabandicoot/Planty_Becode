import axios from "axios";

const BASE_URL = "https://planty-api.onrender.com";

export default axios.create({
    baseURL: BASE_URL
});