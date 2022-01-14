import store from '../store';

export default (to, from, next) => {
  if (store.getters['auth/token']) {
    if (from.href) next({ name: from.name });
    else next({ name: 'dashboard' });
  }
};
