// userService.js
import createApiClient from './api.service';

class UserService {
  constructor(path = '/users') {
    this.api = createApiClient(path);
  }

  async getUserById(id) {
    try {
      const response = await this.api.get(`?id=${id}`);
      console.log(response.data + 'hehe');
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
}

export default new UserService();
