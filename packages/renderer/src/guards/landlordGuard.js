import store from '/@/store';

export default (to, from, next) => {
  if (store.getters['workspace/currentWorkspace'] !== null) {
    if (from.href) next({ name: from.name });
    else next({ name: 'login' });
  }
};
