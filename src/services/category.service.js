import createApiClient from './api.service';

class categoryService {
  constructor(path = '/categories') {
    this.api = createApiClient(path);
  }

  async getAll() {
    return (await this.api.get('/')).data;
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

export default new categoryService();
