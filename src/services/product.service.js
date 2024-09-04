import createApiClient from './api.service';

class productService {
  constructor(path = '/products') {
    this.api = createApiClient(path);
  }

    async getAll(query = {}, page, limit) {
    if (!(query instanceof URLSearchParams)) {
      query = new URLSearchParams(query);
    }
  
    const params = new URLSearchParams();
  
    if (query.get('productName')) params.append('productName', query.get('productName'));
    if (query.get('productType')) params.append('productType', query.get('productType'));
    if (query.get('brand')) params.append('brand', query.get('brand'));
    if (query.get('minPrice')) params.append('minPrice', query.get('minPrice'));
    if (query.get('maxPrice')) params.append('maxPrice', query.get('maxPrice'));
  
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
  
    return (await this.api.get('/', { params })).data;
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
