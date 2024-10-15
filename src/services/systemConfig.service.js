import createApiClient from './api.service';

class SystemConfig {
  constructor(path = '/system-configurations') {
    this.api = createApiClient(path);
  }

  async getCurrentConfigs() {
    try {
      const response = await this.api.get(`/current`);

      return response.data;
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }
}

export default new SystemConfig();
