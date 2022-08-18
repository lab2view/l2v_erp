<template>
  <div class="info-block">
    <h6>{{ articleName }}</h6>
    <p v-html="article.product.description"></p>
    <div class="star-ratings">
      <ul class="search-info">
        <li>2.5 stars</li>
        <li>590 votes</li>
        <li>Music</li>
      </ul>
    </div>
  </div>
</template>

<script>
import ArticleMixin from '/@/mixins/ArticleMixin.js';
import { getStockExitLineArticleStock } from '/@/helpers/utils.js';

export default {
  mixins: [ArticleMixin],
  computed: {
    articleName() {
      return `(${(getStockExitLineArticleStock(this.article) / 6).toFixed(
        2
      )}) ${this.article.product.code} / ${this.article.product.reference} - ${
        this.article.name
      }`;
    },
  },
};
</script>

<style scoped></style>
