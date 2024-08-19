import axios from "axios";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

const rootURL = "https://ct250-backend-nydf.onrender.com/api/v1";

export default (path) => {
    const baseURL = `${rootURL}${path}`;
    return axios.create({
        baseURL: baseURL,
        ...commonConfig,
    });
};