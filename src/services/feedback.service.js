import createApiClient from './api.service';

class FeedbackService {
  constructor(path = '/feedback') {
    this.api = createApiClient(path);
  }

  async createFeedback(feedbackData, accessToken) {
    try {
      const response = await this.api.post('/', feedbackData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error creating feedback');
    }
  }
}

export default new FeedbackService();
