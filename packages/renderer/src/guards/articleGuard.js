import store from '../store';

export default (to, from, next) => {
  if (store.getters['article/article'] === null) {
    if (from.href) next({ name: from.name });
    else return false;
  }
};
