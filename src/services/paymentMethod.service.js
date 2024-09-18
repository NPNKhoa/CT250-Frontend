import createApiClient from './api.service';

class paymentMethodService {
  constructor(path = '/payment-methods') {
    this.api = createApiClient(path);
  }

  async getAll() {
    return (await this.api.get('/')).data;
  }
}

export default new paymentMethodService();
