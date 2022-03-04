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

  addStockProvisions(stockEntryId, stockProvisions) {
    return axios.post(
      `/stocks/entries/${stockEntryId}/provisions/add`,
      stockProvisions
    );
  },
  updateStockProvision(stockProvision) {
    return axios.put(
      `/stocks/entries/provisions/${stockProvision.id}/update`,
      stockProvision
    );
  },
  removeStockProvisions(stockEntryId, stockProvisionIds) {
    return axios.post(
      `/stocks/entries/${stockEntryId}/provisions/remove`,
      stockProvisionIds
    );
  },

  setStockEntryState(stockEntryId, stock_state_id) {
    return axios.post(`/stocks/entries/${stockEntryId}/states`, {
      stock_state_id,
    });
  },
};
