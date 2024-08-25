import createApiClient from './api.service';

class authService {
  constructor(path = '/auth') {
    this.api = createApiClient(path);
  }

  async login(data) {
    try {
      const res = await this.api.post('/login', data);

      console.log(res);
    } catch (error) {
      console.log(error.response.data.error);
    }
    return (await this.api.post('/login', data)).data;
  }

  async logout(data) {
    return (await this.api.post('/logout', data)).data;
  }

  async signup(data) {
    return (
      await this.api.post('/signup', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ).data;
  }

  async addRole(data) {
    return (await this.api.post('/add-role', data)).data;
  }

  async getRole() {
    return (await this.api.get('/roles')).data;
  }
}

export default new authService();
