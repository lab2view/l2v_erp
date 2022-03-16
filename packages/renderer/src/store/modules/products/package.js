import packageService from '../../../services/products/PackageService';
import { notify } from '../../../helpers/notify';
import i18n from '../../../i18n';

const state = {
  packages: null,
  hash: null,
  packageModel: null,
};

// getters
const getters = {
  packages: (state) => (state.packages ? JSON.parse(state.packages) : []),
  packageModel: (state) =>
    state.packageModel ? JSON.parse(state.packageModel) : null,
};

// privileges
const actions = {
  getPackageList({ commit, getters }, { page, field }) {
    if (getters.packages.length > 0) {
      return getters.packages;
    } else
      return packageService.getList(page, field).then(({ data }) => {
        commit('SET_PACKAGES', data);
        return data;
      });
  },

  getPackage({ getters, commit }, id) {
    const p = getters.packages.find((p) => p.id.toString() === id);
    if (p !== undefined) {
      commit('SET_CURRENT_PACKAGE', p);
      return p;
    } else
      return packageService.get(id).then(({ data }) => {
        commit('SET_CURRENT_PACKAGE', data);
        return data;
      });
  },

  addPackage({ commit }, packageField) {
    return packageService.add(packageField).then(({ data }) => {
      commit('ADD_PACKAGE', data);
      notify(
        i18n.global.t('products.package.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updatePackage({ commit }, packageField) {
    return packageService
      .update(packageField, packageField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('products.package.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_PACKAGE', data);
        return data;
      });
  },

  deletePackage({ commit }, packageId) {
    return packageService.delete(packageId).then(({ data }) => {
      commit('DELETE_PACKAGE', packageId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_PACKAGES(state, packages) {
    state.packages = JSON.stringify(packages);
  },
  SET_CURRENT_PACKAGE(state, pack) {
    state.packageModel = JSON.stringify(pack);
  },
  ADD_PACKAGE(state, pack) {
    let packages = JSON.parse(state.packages);
    packages.push(pack);
    state.packages = JSON.stringify(packages);
  },
  UPDATE_PACKAGE(state, pack) {
    let packages = JSON.parse(state.packages);
    const index = packages.findIndex((p) => p.id === pack.id);
    if (index !== -1) {
      packages.splice(index, 1, pack);
      state.packages = JSON.stringify(packages);
    }
  },
  DELETE_PACKAGE(state, packageId) {
    state.packages = JSON.stringify(
      JSON.parse(state.packages).filter((p) => p.id !== packageId)
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
