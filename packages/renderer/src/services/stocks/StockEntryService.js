import axios from '/@/config/axios';

export default {
  getStockEntriesList(page, field) {
    return axios.post(`/stocks/entries/list?page=${page}`, field);
  },

  addStockEntry(stockEntry) {
    return axios.post(`/stocks/entries`, stockEntry);
  },

  getStockEntry(id) {
    return axios.get(`/stocks/entries/${id}`);
  },

  updateStockEntry(stockEntry) {
    return axios.put(`/stocks/entries/${stockEntry.id}`, stockEntry);
  },

  deleteStockEntry(id) {
    return axios.delete(`/stocks/entries/${id}`);
  },

  restoreStockEntry(id) {
    return axios.post(`/stocks/entries/restore/${id}`);
  },

  forceDeleteStockEntry(id) {
    return axios.delete(`/stocks/entries/delete/${id}`);
  },

  addStockEntryLines(stockEntryId, stockEntryLines) {
    return axios.post(
      `/stocks/entries/${stockEntryId}/lines/add`,
      stockEntryLines
    );
  },
  updateStockEntryLine(stockEntryLine) {
    return axios.put(
      `/stocks/entries/lines/${stockEntryLine.id}/update`,
      stockEntryLine
    );
  },
  removeStockEntryLines(stockEntryId, stockEntryLineIds) {
    return axios.post(
      `/stocks/entries/${stockEntryId}/lines/remove`,
      stockEntryLineIds
    );
  },

  addProvisions(stockEntryId, stockProvisions) {
    return axios.post(
      `/stocks/entries/${stockEntryId}/provisions/add`,
      stockProvisions
    );
  },
  updateProvision(provision) {
    return axios.put(
      `/stocks/entries/provisions/${provision.id}/update`,
      provision
    );
  },
  removeProvisions(stockEntryId, provisionIds) {
    return axios.post(
      `/stocks/entries/${stockEntryId}/provisions/remove`,
      provisionIds
    );
  },

  setStockEntryState(stockEntryId, stock_state_id) {
    return axios.post(`/stocks/entries/${stockEntryId}/states`, {
      stock_state_id,
    });
  },
};
