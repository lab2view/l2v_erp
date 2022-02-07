import store from '../store';

export default (to, from, next) => {
  if (store.getters['product/product'] === null) {
    if (from.href) next({ name: from.name });
    else {
      next({ name: 'products' });
    }
  }
};
