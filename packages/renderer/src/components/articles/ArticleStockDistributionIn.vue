<template>
  <div class="f-16 f-w-600">
    {{ totalStock }}
  </div>
</template>

<script>
import ArticleDistributionMixin from '/@/mixins/ArticleDistributionMixin.js';

export default {
  name: 'ArticleStockDistribution',
  mixins: [ArticleDistributionMixin],
};
</script>

<style scoped></style>
