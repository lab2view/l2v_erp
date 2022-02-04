import articleGroupService from '../../../services/articles/ArticleGroupService';
import { notify } from '../../../helpers/notify';
import i18n from '../../../i18n';

const state = {
  articleGroups: null,
  hash: null,
};

// getters
const getters = {
  articleGroups: (state) =>
    state.articleGroups ? JSON.parse(state.articleGroups) : [],
};

// privileges
const actions = {
  getArticleGroupList({ commit, getters }, { page, field }) {
    if (getters.articleGroups.length > 0) {
      return getters.articleGroups;
    } else
      return articleGroupService.getList(page, field).then(({ data }) => {
        commit('SET_ARTICLE_GROUPS', data);
        return data;
      });
  },

  getArticleGroup({ getters }, id) {
    const articleGroup = getters.articleGroups.find(
      (p) => p.id.toString() === id
    );
    if (articleGroup !== undefined) {
      return articleGroup;
    } else
      return articleGroupService.get(id).then(({ data }) => {
        return data;
      });
  },

  addArticleGroup({ commit }, articleGroupField) {
    return articleGroupService.add(articleGroupField).then(({ data }) => {
      commit('ADD_ARTICLE_GROUP', data);
      notify(
        i18n.global.t('article.articleGroup.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateArticleGroup({ commit }, articleGroupField) {
    return articleGroupService
      .update(articleGroupField, articleGroupField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('article.articleGroup.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_ARTICLE_GROUP', data);
        return data;
      });
  },

  deleteArticleGroup({ commit }, articleGroupId) {
    return articleGroupService.delete(articleGroupId).then(({ data }) => {
      commit('DELETE_ARTICLE_GROUP', articleGroupId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_ARTICLE_GROUPS(state, articleGroups) {
    state.articleGroups = JSON.stringify(articleGroups);
  },
  ADD_ARTICLE_GROUP(state, pack) {
    let articleGroups = JSON.parse(state.articleGroups);
    articleGroups.push(pack);
    state.articleGroups = JSON.stringify(articleGroups);
  },
  UPDATE_ARTICLE_GROUP(state, pack) {
    let articleGroups = JSON.parse(state.articleGroups);
    const index = articleGroups.findIndex((p) => p.id === pack.id);
    if (index !== -1) {
      articleGroups.splice(index, 1, pack);
      state.articleGroups = JSON.stringify(articleGroups);
    }
  },
  DELETE_ARTICLE_GROUP(state, articleGroupId) {
    state.articleGroups = JSON.stringify(
      JSON.parse(state.articleGroups).filter((p) => p.id !== articleGroupId)
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
