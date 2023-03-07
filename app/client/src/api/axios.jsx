import axios from "axios";

const BASE_URL = "https://stingray-app-2ugjx.ondigitalocean.app/";

export default axios.create({
    baseURL: BASE_URL,
});
