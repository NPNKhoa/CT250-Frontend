import createApiClient from './api.service';

class productTypeService {
  constructor(path = '/product-types') {
    this.api = createApiClient(path);
  }

  async getAllTypes() {
    return (await this.api.get('/')).data;
  }

  async getTypeById(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async addType(data) {
    return (await this.api.post('/', data)).data;
  }

  async updateType(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  async deleteType(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new productTypeService();
