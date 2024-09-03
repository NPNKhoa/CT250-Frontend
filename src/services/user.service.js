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

  // Lấy thông tin của người dùng đã đăng nhập
  async getLoggedInUser() {
    try {
      const response = await this.api.get('/me');
      console.log('Logged-in user data:', response.data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 'Error fetching logged-in user data'
      );
    }
  }
}

export default new UserService();
