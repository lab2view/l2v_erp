import axios from '/@/config/axios';

export default {
  addArticleImages(article_id, formData) {
    return axios.post(`/articles/${article_id}/images/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  setArticleImageAsCover(article_id, media_id) {
    return axios.get(`/articles/${article_id}/images/${media_id}/set-as-cover`);
  },

  removeArticleImages(article_id, imageIds) {
    return axios.post(`/articles/${article_id}/images/remove`, imageIds);
  },
};
