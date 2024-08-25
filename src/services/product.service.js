import createApiClient from './api.service';

class productService {
  constructor(path = '/products') {
    this.api = createApiClient(path);
  }

  async getAllProducts() {
    return (await this.api.get('/')).data;
  }

  async getProductById(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async addProduct(data) {
    return (
      await this.api.post('/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ).data;
  }

  async updateProduct(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  async deleteProduct(id) {
    return (await this.api.delete(`${id}`)).data;
  }
}

export default new productService();
