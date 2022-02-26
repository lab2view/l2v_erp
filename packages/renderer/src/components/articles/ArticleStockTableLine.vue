<template>
  <tr>
    <td class="f-w-600">
      {{ article.name }}
    </td>
    <td class="text-center font-primary">{{ article.stock.total_entry }}</td>
    <td class="text-center font-secondary">{{ article.stock.total_exit }}</td>
    <td class="text-center"><ArticleStockIn :article="article" /></td>
  </tr>
</template>

<script>
import ArticleMixin from '/@/mixins/ArticleMixin';
import ArticleStockIn from '/@/components/articles/ArticleStockIn.vue';

export default {
  components: { ArticleStockIn },
  mixins: [ArticleMixin],
};
</script>

<style scoped></style>
