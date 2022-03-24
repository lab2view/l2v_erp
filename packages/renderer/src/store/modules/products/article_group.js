import articleGroupService from '../../../services/articles/ArticleGroupService';
import { notify } from '/@/helpers/notify';
import i18n from '../../../i18n';

const state = {
  articleGroups: null,
  hash: null,
  articleGroup: null,
};

// getters
const getters = {
  articleGroups: (state) =>
    state.articleGroups ? JSON.parse(state.articleGroups) : [],
  articleGroup: (state) =>
    state.articleGroup ? JSON.parse(state.articleGroup) : null,
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

  getArticleGroup({ getters, commit }, id) {
    const articleGroup = getters.articleGroups.find(
      (p) => p.id.toString() === id
    );
    if (articleGroup !== undefined) {
      commit('SET_CURRENT_ARTICLE_GROUP', articleGroup);
      return articleGroup;
    } else
      return articleGroupService.get(id).then(({ data }) => {
        commit('SET_CURRENT_ARTICLE_GROUP', data);
        return data;
      });
  },

  addArticleGroup({ commit }, articleGroupField) {
    return articleGroupService.add(articleGroupField).then(({ data }) => {
      commit('ADD_ARTICLE_GROUP', data);
      commit('SET_CURRENT_ARTICLE_GROUP', data);
      notify(
        i18n.global.t('articles.group.store'),
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
          i18n.global.t('articles.group.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_ARTICLE_GROUP', data);
        commit('SET_CURRENT_ARTICLE_GROUP', data);
        return data;
      });
  },

  deleteArticleGroup({ commit }, articleGroupId) {
    return articleGroupService.delete(articleGroupId).then(({ data }) => {
      commit('DELETE_ARTICLE_GROUP', articleGroupId);
      return data;
    });
  },

  addArticleGroupLines({ getters, commit }, articles) {
    return articleGroupService
      .addArticles(articles, getters.articleGroup.id)
      .then(({ data }) => {
        commit('ADD_ARTICLE_GROUP_LINE', data.articleGroupLines);
      });
  },

  updateArticleGroupLine({ commit }, { quantity, id }) {
    return articleGroupService
      .updateArticleQuantity(quantity, id)
      .then(({ data }) => {
        commit('UPDATE_ARTICLE_GROUP_LINE', data);
        notify(
          i18n.global.t('articles.group.line.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
      });
  },

  removeArticleGroupLines({ getters, commit }, articleGroupLines) {
    return articleGroupService
      .removeArticles(
        {
          article_group_line_ids: [...articleGroupLines],
        },
        getters.articleGroup.id
      )
      .then(() => {
        commit('REMOVE_ARTICLE_GROUP_LINE', articleGroupLines);
      });
  },
};

// mutations
const mutations = {
  SET_ARTICLE_GROUPS(state, articleGroups) {
    state.articleGroups = JSON.stringify(articleGroups);
  },
  SET_CURRENT_ARTICLE_GROUP(state, articleGroup) {
    state.articleGroup =
      articleGroup === null ? null : JSON.stringify(articleGroup);
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
  ADD_ARTICLE_GROUP_LINE(state, articleGroupLines) {
    let articleGroups = JSON.parse(state.articleGroups);
    let articleGroup = JSON.parse(state.articleGroup);
    let index = articleGroups.findIndex((p) => p.id === articleGroup.id);
    if (index !== -1) {
      articleGroup.article_group_lines = [
        ...articleGroup.article_group_lines,
        ...articleGroupLines,
      ];
      articleGroups.splice(index, 1, articleGroup);
      state.articleGroup = JSON.stringify(articleGroup);
      state.articleGroups = JSON.stringify(articleGroups);
    }
  },
  UPDATE_ARTICLE_GROUP_LINE(state, articleGroupLine) {
    let articleGroups = JSON.parse(state.articleGroups);
    let articleGroup = JSON.parse(state.articleGroup);
    let index = articleGroups.findIndex((p) => p.id === articleGroup.id);
    if (index !== -1) {
      let i = articleGroup.article_group_lines.findIndex(
        (al) => al.id === articleGroupLine.id
      );
      if (i !== -1) {
        articleGroup.article_group_lines.splice(i, 1, articleGroupLine);
        articleGroups.splice(index, 1, articleGroup);
        state.articleGroup = JSON.stringify(articleGroup);
        state.articleGroups = JSON.stringify(articleGroups);
      }
    }
  },
  REMOVE_ARTICLE_GROUP_LINE(state, articleGroupLines) {
    let articleGroups = JSON.parse(state.articleGroups);
    let articleGroup = JSON.parse(state.articleGroup);
    let index = articleGroups.findIndex((p) => p.id === articleGroup.id);
    if (index !== -1) {
      articleGroup.article_group_lines =
        articleGroup.article_group_lines.filter((agl) => {
          return articleGroupLines.find((al) => al === agl.id) === undefined;
        });
      articleGroups.splice(index, 1, articleGroup);
      state.articleGroup = JSON.stringify(articleGroup);
      state.articleGroups = JSON.stringify(articleGroups);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
