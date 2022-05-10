import store from '../store';

export default (to, from, next) => {
  if (store.getters['cashier_session/currentSession'] === null) {
    next({ name: 'sales.session.auth' });
  }
};
