export default {
  props: {
    articleGroup: {
      type: Object,
      default: null,
    },
  },
  computed: {
    haveArticleGroup() {
      return !!this.articleGroup;
    },
  },
};
