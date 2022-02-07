import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('article_group', ['articleGroup']),
    haveArticleGroup() {
      return !!this.articleGroup;
    },
  },
};
