import store from '../store';

export default (to, from, next) => {
  let redirectName = 'dashboard';
  if (store.getters['auth/isCashierRole']) redirectName = 'sales.session';

  if (store.getters['auth/token']) {
    if (from.href) next({ name: from.name });
    else next({ name: redirectName });
  }
};
