import axios from '/@/config/axios';

export default {
  refreshModelList(hash, field) {
    let url = `/synchronisation/${hash}`;
    const page = field?.page ?? null;
    if (page) url += `?page=${page}`;

    return axios.get(url, field);
  },
};
