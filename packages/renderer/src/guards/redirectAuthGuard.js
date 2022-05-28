import store from '../store';

export default (to, from, next) => {
  let redirectName = from.href ? from.name : 'dashboard';
  if (store.getters['auth/isCashierRole']) redirectName = 'sales.session';

  if (store.getters['auth/token']) {
    next({ name: redirectName });
  }
};
