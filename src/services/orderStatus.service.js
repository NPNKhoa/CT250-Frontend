import createApiClient from './api.service';

class OrderStatusService {
  constructor(path = '/order-status') {
    this.api = createApiClient(path);
  }

  async getAllOrderStatus() {
    try {
      const response = await this.api.get('');
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Error fetching order status');
    }
  }
}

export default new OrderStatusService();
