import store from '../store';

export default (to, from, next) => {
  if (store.getters['cashier_session/currentSession']) {
    next({ name: 'sales.session' });
  }
};
