import createApiClient from './api.service';

class brandService {
  constructor(path = '/brands') {
    this.api = createApiClient(path);
  }

  async getAll(limit) {
    return (await this.api.get(`/?limit=${limit}`)).data;
  }

  async getById(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async add(data) {
    return (await this.api.post('/', data)).data;
  }

  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new brandService();
