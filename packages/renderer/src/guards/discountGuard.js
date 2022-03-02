import store from '../store';

export default (to, from, next) => {
  if (store.getters['discount/discount'] === null) {
    if (from.href) next({ name: from.name });
    else {
      next({ name: 'sales.discounts' });
    }
  }
};
