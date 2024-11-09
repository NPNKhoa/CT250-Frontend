import createApiClient from './api.service';

class recommendationService {
  constructor(path = '/recommendation') {
    this.api = createApiClient(path);
    this.accessToken = localStorage.getItem('accessToken');
  }

  async getNewProduct(limit) {
    return (await this.api.get(`/new?${limit}`)).data;
  }

  async getSimilarProduct(limit, productId) {
    return (await this.api.post(`/similar?${limit}`, { productId })).data;
  }

  async getSuggestedProducts() {
    return (
      await this.api.get('/for-user', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
    ).data;
  }
}

export default new recommendationService();
