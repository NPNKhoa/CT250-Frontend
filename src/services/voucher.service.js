import createApiClient from './api.service';

const accessToken = localStorage.getItem('accessToken');

class productService {
  constructor(path = '/vouchers') {
    this.api = createApiClient(path);
  }

  async getPublishing() {
    return (await this.api.get('/publishing')).data;
  }

  async collect(voucherId) {
    return (
      await this.api.post(
        '/collect',
        { voucherId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
    ).data;
  }
}

export default new productService();
