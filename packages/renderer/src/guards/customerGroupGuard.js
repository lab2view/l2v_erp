import store from '../store';

export default (to, from, next) => {
  if (store.getters['customerGroup/customerGroup'] === null) {
    if (from.href) next({ name: from.name });
    else {
      next({ name: 'customers.groups' });
    }
  }
};
