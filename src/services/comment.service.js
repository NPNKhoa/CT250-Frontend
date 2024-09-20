import createApiClient from './api.service';

class CommentService {
  constructor(path = '/comments') {
    this.api = createApiClient(path);
  }

  async getAllComments(productId) {
    try {
      const response = await this.api.get('/by-product', {
        params: { productId },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error fetching comments');
    }
  }

  async createComment(productId, star, content, accessToken) {
    try {
      const response = await this.api.post(
        '/',
        { productId, star, content },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error creating comment');
    }
  }
}

export default new CommentService();
