<template>
  <ArticleSelectableList
    :used-articles="articleGroup.article_group_lines"
    :submit-store-action="submitArticleGroupLinesForm"
  >
    <div class="card-header p-3">
      <h5>{{ $t('article.group.line.formTitle') }}</h5>
    </div>
  </ArticleSelectableList>
</template>

<script>
import ArticleSelectableList from '/@/components/articles/ArticleSelectableList.vue';

export default {
  components: {
    ArticleSelectableList,
  },
  props: {
    articleGroup: {
      type: Object,
      required: true,
    },
  },
  methods: {
    submitArticleGroupLinesForm(selected) {
      return this.$store.dispatch('article_group/addArticleGroupLines', {
        articles: selected,
      });
    },
  },
};
</script>

<style scoped></style>
