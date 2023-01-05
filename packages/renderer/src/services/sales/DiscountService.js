import axios from '/@/config/axios';

export default {
  getDiscountsList(page, field) {
    return axios.post(`/discounts/list?page=${page}`, field);
  },

  addDiscount(discount) {
    return axios.post(`/discounts`, discount);
  },

  getDiscount(id) {
    return axios.get(`/discounts/${id}`);
  },

  updateDiscount(discount, id) {
    return axios.put(`/discounts/${id}`, discount);
  },

  deleteDiscount(id) {
    return axios.delete(`/discounts/${id}`);
  },

  restoreDiscount(id) {
    return axios.post(`/discounts/restore/${id}`);
  },

  forceDeleteDiscount(id) {
    return axios.delete(`/discounts/delete/${id}`);
  },

  addArticles(articles, discount_id) {
    return axios.post(`/discounts/articles/${discount_id}/add`, { articles });
  },

  addCustomers(customers, discount_id) {
    return axios.post(`/discounts/customers/${discount_id}/add`, { customers });
  },

  removeArticleDiscounts(discountArticleIds, discount_id) {
    return axios.post(`/discounts/articles/${discount_id}/remove`, {
      discount_article_ids: discountArticleIds,
    });
  },

  removeDiscountCustomers(discountCustomerIds, discount_id) {
    return axios.post(`/discounts/customers/${discount_id}/remove`, {
      discount_customer_ids: discountCustomerIds,
    });
  },
};
