import createApiClient from './api.service';

class productService {
  constructor(path = '/products') {
    this.api = createApiClient(path);
  }

  async getAll(query = {}, page, limit, sortBy, isDesc) {
    if (!(query instanceof URLSearchParams)) {
      query = new URLSearchParams(query);
    }

    const params = new URLSearchParams();

    if (query.get('searchString'))
      params.append('searchString', query.get('searchString'));
    if (query.get('productType'))
      params.append('productType', query.get('productType'));
    if (query.get('brand')) params.append('brand', query.get('brand'));
    if (query.get('minPrice')) params.append('minPrice', query.get('minPrice'));
    if (query.get('maxPrice')) params.append('maxPrice', query.get('maxPrice'));

    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);

    if (sortBy) params.append('sortBy', sortBy);
    if (isDesc !== undefined) params.append('isDesc', String(isDesc));

    try {
      const response = await this.api.get('/', { params });
      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response:', error.response);
        throw new Error(
          `Request failed with status code ${error.response.status}: ${
            error.response.data?.error || 'Unknown error'
          }`
        );
      } else if (error.request) {
        // Request was made but no response was received
        console.error('Error request:', error.request);
        throw new Error('No response received from server.');
      } else {
        // Other errors (e.g., network issue)
        console.error('Error message:', error.message);
        throw new Error(`Request failed: ${error.message}`);
      }
    }
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
