import axios from '/@/config/axios';

export default {
  getList(page, field) {
    return axios.post(`/properties/list?page=${page}`, field);
  },

  add(property) {
    return axios.post(`/properties`, property);
  },

  get(id) {
    return axios.get(`/properties/${id}`);
  },

  update(property, id) {
    return axios.put(`/properties/${id}`, property);
  },

  delete(id) {
    return axios.delete(`/properties/${id}`);
  },

  restore(id) {
    return axios.post(`/properties/restore/${id}`);
  },

  forceDelete(id) {
    return axios.delete(`/properties/delete/${id}`);
  },

  getPropertyTypes() {
    return axios.post(`/properties/types/list`);
  },

  updatePropertyType(propertyType, id) {
    return axios.put(`/properties/${id}`, propertyType);
  },

  addPropertyValues(propertyValues, property_id) {
    return axios.post(`/properties/${property_id}/values/add`, propertyValues);
  },
  updatePropertyValue(propertyValue) {
    return axios.put(
      `/properties/values/${propertyValue.id}/update`,
      propertyValue
    );
  },
  removePropertyValues(propertyValueIds, property_id) {
    return axios.post(
      `/properties/${property_id}/values/remove`,
      propertyValueIds
    );
  },
};
