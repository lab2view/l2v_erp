<template>
  <ArticleSelectableList
    :used-articles="compositionPresets"
    :submit-store-action="submitCompositionPresetForm"
  />
</template>

<script>
import ArticleSelectableList from '/@/components/articles/ArticleSelectableList.vue';
import ArticleMixin from '/@/mixins/ArticleMixin.js';
export default {
  components: { ArticleSelectableList },
  mixins: [ArticleMixin],
  computed: {
    compositionPresets() {
      return this.article?.composition_presets
        ? this.article.composition_presets.map((cp) => {
            return { ...cp, article_id: cp.child_article_id };
          })
        : [];
    },
  },
  methods: {
    submitCompositionPresetForm(selected) {
      return this.$store.dispatch('article/addCompositionPresets', {
        articles: selected,
      });
    },
  },
};
</script>

<style scoped></style>
