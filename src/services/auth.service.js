import createApiClient from "./api.service";

class authService {
    constructor(baseUrl = "http://localhost:5000/api/v1/auth") {
        this.api = createApiClient(baseUrl);
    }

    async login(data) {
        return (await this.api.post("/login", data)).data;
    }

    async logout(data) {
        return (await this.api.post("/logout", data)).data;
    }

    async signup(data) {
        return (await this.api.post("/signup", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })).data;
    }

    async addRole(data) {
        return (await this.api.post("/add-role", data)).data;
    }

    async getRole() {
        return (await this.api.get("/roles")).data;
    }
}

export default new authService();