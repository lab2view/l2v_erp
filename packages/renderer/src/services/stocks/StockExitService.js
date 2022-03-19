import axios from '/@/config/axios';

export default {
  getList(page, field) {
    return axios.post(`/stocks/exits/list?page=${page}`, field);
  },

  add(stockExit) {
    return axios.post(`/stocks/exits`, stockExit);
  },

  get(id) {
    return axios.get(`/stocks/exits/${id}`);
  },

  update(stockExit, id) {
    return axios.put(`/stocks/exits/${id}`, stockExit);
  },

  delete(id) {
    return axios.delete(`/stocks/exits/${id}`);
  },

  restore(id) {
    return axios.post(`/stocks/exits/restore/${id}`);
  },

  forceDelete(id) {
    return axios.delete(`/stocks/exits/delete/${id}`);
  },

  addExitLines(stockExitId, stockExitLines) {
    return axios.post(`/stocks/exits/${stockExitId}/lines/add`, stockExitLines);
  },
  updateExitLine(stockExitLine) {
    return axios.put(
      `/stocks/exits/lines/${stockExitLine.id}/update`,
      stockExitLine
    );
  },
  removeExitLines(stockExitId, stockExitLineIds) {
    return axios.post(
      `/stocks/exits/${stockExitId}/lines/remove`,
      stockExitLineIds
    );
  },

  setStockExitState(stockExitId, stock_state_id) {
    return axios.post(`/stocks/exits/${stockExitId}/states`, {
      stock_state_id,
    });
  },
};
