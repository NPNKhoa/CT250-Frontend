import createApiClient from './api.service';

class articleService {
  constructor(path = '/article') {
    this.api = createApiClient(path);
  }

  async getAll(page, limit) {
    return (await this.api.get(`/?limit=${limit}&page=${page}`)).data;
  }

  async getById(id) {
    return (await this.api.get(`/${id}`)).data;
  }
}

export default new articleService();
