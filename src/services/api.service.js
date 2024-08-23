import axios from "axios";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

async function checkLocalhost() {
    try {
        await axios.get('http://localhost:5000/check');
        return true;
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return false;
    }
}

const isLocalhostRunning = await checkLocalhost();

const rootURL = isLocalhostRunning 
        ? "http://localhost:5000/api/v1" 
        : "https://ct250-backend-nydf.onrender.com/api/v1";

console.log(rootURL);

export default (path) => {
    const baseURL = `${rootURL}${path}`;
    return axios.create({
        baseURL: baseURL,
        ...commonConfig,
    });
};