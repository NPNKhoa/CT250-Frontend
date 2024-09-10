import createApiClient from './api.service';

class AddressService {
  constructor(path = '/address') {
    this.api = createApiClient(path);
  }

  async updateAddress(updatedData, id, accessToken) {
    try {
      const response = await this.api.put(
        `/${id}`,
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
          Authorization: `Bearer ${accessToken}`
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error creating address');
    }
  }

  async getUserAddress(accessToken) {
    try {
      const response = await this.api.get('/', {
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

  async deleteAddress(id, accessToken) {
    try {
      const response = await this.api.delete(`/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 'Error deleting address'
      );
    }
  }

  async setDefaultAddress(id, accessToken) {
    try {
      const response = await this.api.put(
        `/set-default/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    }
    catch (error) {
      throw new Error(
        error.response?.data?.error || 'Error setting default address'
      );
    }
  }
}

export default new AddressService();
