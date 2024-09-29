import createApiClient from './api.service';

class authService {
  constructor(path = '/auth') {
    this.api = createApiClient(path);
  }

  async login(data) {
    return (await this.api.post('/login', data)).data;
  }

  async logout(accessToken) {
    return (
      await this.api.post(
        '/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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

  async loginWithSocial(data) {
    return (await this.api.post('/login-with-social', data)).data;
  }

  async verifyEmail(token) {
    return (await this.api.get(`/verify-email?token=${token}`)).data;
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
