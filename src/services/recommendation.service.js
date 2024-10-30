import createApiClient from './api.service';

class recommendationService {
    constructor(path = '/recommendation') {
        this.api = createApiClient(path);
    }

    async getNewProduct(limit) {
        return (await this.api.get(`/new?${limit}`)).data;
    }

    async getSimilarProduct(limit, productId) {
        return (await this.api.post(`/similar?${limit}`, {productId})).data;
    }
}

export default new recommendationService();
