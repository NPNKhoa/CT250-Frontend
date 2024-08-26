import createApiClient from './api.service';

class productService {
  constructor(path = '/products') {
    this.api = createApiClient(path);
  }

  async getAll() {
    return (await this.api.get('/')).data;
  }

  async getByName(productName, page, limit) {
    const params = new URLSearchParams({
      productName, 
      page, 
      limit
    });
  
    return (await this.api.get(`/?${params.toString()}`)).data;
  }
  

  async getById(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async add(data) {
    return (
      await this.api.post('/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ).data;
  }

  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new productService();
