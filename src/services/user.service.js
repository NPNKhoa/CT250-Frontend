import createApiClient from './api.service';

class UserService {
  constructor(path = '/users') {
    this.api = createApiClient(path);
  }

  async getUserById(id) {
    try {
      const response = await this.api.get(`?id=${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error || 'Error fetching user data');
    }
  }

  async getLoggedInUser(accessToken) {
    try {
      // console.log(accessToken);
      const response = await this.api.get('/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log('Logged-in user data:', response.data.data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 'Error fetching logged-in user data'
      );
    }
  }

  async updateUserInfo(updatedData, accessToken) {
    try {
      const response = await this.api.put('/', updatedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 'Error updating user information'
      );
    }
  }

  async updatePassword(updatedData, accessToken) {
    try {
      const response = await this.api.put('/update-password', updatedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error updating password');
    }
  }
}

export default new UserService();
