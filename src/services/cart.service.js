import createApiClient from './api.service';

class UserService {
    constructor(path = '/cart') {
        this.api = createApiClient(path);
    }

    async getCartByUser(accessToken) {
        return (await this.api.get('/',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )).data;
    }

    async addToCart(accessToken, data) {
        return (await this.api.post('/add' , data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )).data;
    }

    async updateQuantity(accessToken, data) {
        return (await this.api.put('/update-quantity' , data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )).data;
    }

    async deleteItem(accessToken, id) {
        return (await this.api.delete(`/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })).data;
    }

    async deleteAll(accessToken) {
        return (await this.api.delete('/all', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })).data;
    }
    
}

export default new UserService();