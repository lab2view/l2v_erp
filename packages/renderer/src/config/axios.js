import axios from 'axios';
import { notify } from '../helpers/notify';
import store from '../store';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.crossDomain = true;

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    const protocol = import.meta.env.VITE_PROTOCOL ?? 'https';
    config.baseURL = `${protocol}://${store.getters['workspace/currentDomain']}/api/`;

    const token = store.getters['auth/token'] ?? null;
    if (token) config.headers.common['Authorization'] = `Bearer ${token}`;

    const currentEnterprise = store.getters['auth/currentEnterprise'] ?? null;
    if (currentEnterprise)
      config.headers.common['X-Enterprise-Id'] = currentEnterprise.id;

    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    if (response.data?.message)
      notify(response.data.message, 'Ok', 'theme', 'fa fa-check');
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.data?.message)
        notify(error.response.data.message, 'Erreur', 'danger');
      if (error.response.status === 401) {
        store.commit('auth/SET_CURRENT_USER', null);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
