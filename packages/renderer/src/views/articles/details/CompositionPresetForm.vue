<template>
  <ArticleSelectableList
    :used-articles="article.composition_presets ?? []"
    :submit-store-action="submitCompositionPresetForm"
  />
</template>

<script>
import ArticleSelectableList from '/@/components/articles/ArticleSelectableList.vue';
import ArticleMixin from '/@/mixins/ArticleMixin.js';
export default {
  components: { ArticleSelectableList },
  mixins: [ArticleMixin],
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
