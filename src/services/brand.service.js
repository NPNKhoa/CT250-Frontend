import createApiClient from './api.service';

class brandService {
  constructor(path = '/brands') {
    this.api = createApiClient(path);
  }

  async getAllBrands() {
    return (await this.api.get('/')).data;
  }

  async getBrandById(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async addBrand(data) {
    return (await this.api.post('/', data)).data;
  }

  async updateBrand(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  async deleteBrand(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new brandService();
