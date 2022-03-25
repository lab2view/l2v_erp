import store from '/@/store';

export default (to, from, next) => {
  if (store.getters['stock_exit/stockExit'] === null) {
    if (from.href) next({ name: from.name });
    else {
      next({ name: 'stocks.exits' });
    }
  }
};
