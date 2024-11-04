import createApiClient from './api.service';

class articleService {
  constructor(path = '/article') {
    this.api = createApiClient(path);
  }

  async getAll() {
    return (await this.api.get('/')).data;
  }

  async getById(id) {
    return (await this.api.get(`/${id}`)).data;
  }
}

export default new articleService();
