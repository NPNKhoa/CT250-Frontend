import axios from "axios";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

const URL = "https://ct250-backend-nydf.onrender.com";

export default (path) => {
    const baseURL = `${URL}${path}`;
    return axios.create({
        baseURL: baseURL,
        ...commonConfig,
    });
};