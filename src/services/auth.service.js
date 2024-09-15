import createApiClient from './api.service';

class authService {
  constructor(path = '/auth') {
    this.api = createApiClient(path);
  }

  async login(data) {
    return (await this.api.post('/login', data)).data;
  }

  async logout() {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token provided! Access denied!');
    }
    return (
      await this.api.post(
        '/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    ).data;
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

  async loginWithGoogle(data) {
    return (await this.api.post('/login-with-google', data)).data;
  }

  async addRole(data) {
    return (await this.api.post('/add-role', data)).data;
  }

  async getRole() {
    return (await this.api.get('/roles')).data;
  }

  async refreshToken(refreshToken) {
    return (
      await this.api.post(
        '/refresh',
        { refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    ).data;
  }
}

export default new authService();
