import createApiClient from './api.service';

class CommentService {
  constructor(path = '/comments') {
    this.api = createApiClient(path);
  }

  async getAllComments(productId) {
    try {
      const response = await this.api.get('/byproduct', {
        params: { productId },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error fetching comments');
    }
  }

  async createComment(productId, star, content, reviewImages, accessToken) {
    try {
      const formData = new FormData();

      formData.append('productId', productId);
      formData.append('star', star);
      formData.append('content', content);

      reviewImages.forEach(file => {
        formData.append('reviewImages', file);
      });

      const response = await this.api.post('/', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error creating comment');
    }
  }
}

export default new CommentService();
