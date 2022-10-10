<template>
  <tr v-if="haveStockIn">
    <td>{{ article.id }}</td>
    <td>{{ article.product.name }}</td>
    <td>{{ article.name }}</td>
    <td class="text-center">
      <ArticleStockDistribution
        v-if="distribution"
        :distribution="distribution"
      />
      <ArticleStockIn v-else :article="article" />
    </td>
    <td>
      {{ `${article.product.code} / ${article.product.reference}` }}
    </td>
  </tr>
</template>

<script>
import ArticleMixin from '/@/mixins/ArticleMixin';
import ArticleStockDistribution from '/@/components/articles/ArticleStockDistributionIn.vue';
import {
  getDistributionCurrentStock,
  getStockExitLineArticleStock,
} from '/@/helpers/utils.js';
import ArticleStockIn from '/@/components/articles/ArticleStockIn.vue';

export default {
  name: 'ArticleStatsLineDetails',
  components: { ArticleStockIn, ArticleStockDistribution },
  mixins: [ArticleMixin],
  props: {
    enterpriseId: {
      type: [Number, String],
      default: null,
    },
  },
  computed: {
    distribution() {
      return this.article.stats.distributions.find(
        (d) => d.id === parseInt(this.enterprise_id)
      );
    },
    haveStockIn() {
      return this.distribution
        ? getDistributionCurrentStock(this.distribution)
        : getStockExitLineArticleStock(this.article);
    },
  },
};
</script>

<style scoped></style>
