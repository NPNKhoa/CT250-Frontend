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

const createApiClient = (path) => {
    const baseURL = `${rootURL}${path}`;
    const api = axios.create({
        baseURL: baseURL,
        ...commonConfig,
    });

    api.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            // Bỏ qua làm mới token nếu endpoint là chính xác '/auth/refresh'
            if (originalRequest.url.endsWith('/auth/refresh')) {
                return Promise.reject(error);
            }

            const refreshToken = localStorage.getItem("refreshToken");

            if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
                originalRequest._retry = true;

                try {
                    const response = await axios.post(`${rootURL}/auth/refresh`, {
                        refreshToken: refreshToken,
                    });

                    // console.log("Làm mới token thành công:", response.data);

                    const newAccessToken = response.data.accessToken;
                    const newRefreshToken = response.data.refreshToken;

                    localStorage.setItem("accessToken", newAccessToken);
                    localStorage.setItem("refreshToken", newRefreshToken);

                    // Cập nhật header Authorization với accessToken mới
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                    // Gửi lại yêu cầu ban đầu với accessToken mới
                    return axios(originalRequest);
                } catch (refreshError) {
                    console.error("Làm mới token thất bại:", refreshError);
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    return api;
};

export default createApiClient;