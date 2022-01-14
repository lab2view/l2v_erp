import axios from '/@/config/axios';

export default {
  getList(page, field) {
    return axios.post(`/products/list?page=${page}`, field);
  },

  add(product) {
    return axios.post(`/products`, product);
  },

  get(id) {
    return axios.get(`/products/${id}`);
  },

  update(product, id) {
    return axios.put(`/products/${id}`, product);
  },

  delete(id) {
    return axios.delete(`/products/${id}`);
  },

  restore(id) {
    return axios.post(`/products/restore/${id}`);
  },

  forceDelete(id) {
    return axios.delete(`/products/delete/${id}`);
  },

  saveProperties(productProperties, product_id) {
    return axios.post(
      `/products/${product_id}/properties/save`,
      productProperties
    );
  },

  removeProperties(productPropertyIds, product_id) {
    return axios.post(
      `/products/${product_id}/properties/remove`,
      productPropertyIds
    );
  },

  saveTaxes(productTaxes, product_id) {
    return axios.post(`/products/${product_id}/taxes/save`, productTaxes);
  },

  removeTaxes(productTaxIds, product_id) {
    return axios.post(`/products/${product_id}/taxes/remove`, productTaxIds);
  },
};
