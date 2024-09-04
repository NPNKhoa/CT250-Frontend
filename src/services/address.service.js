import createApiClient from './api.service';

class AddressService {
  constructor(path = '/address') {
    this.api = createApiClient(path);
  }

  async updateAddress(updatedData, id, accessToken) {
    try {
      const response = await this.api.put(
        `/update-address/?id=${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error updating address');
    }
  }

  async createAddress(addressData, accessToken) {
    try {
      const response = await this.api.post('/', addressData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error creating address');
    }
  }

  async getUserAddress(accessToken) {
    try {
      const response = await this.api.get(`/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 'Error fetching user address'
      );
    }
  }
}

export default new AddressService();
