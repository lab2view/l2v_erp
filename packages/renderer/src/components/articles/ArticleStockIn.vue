<template>
  <div class="span badge rounded-pill" :class="`pill-badge-${stockClassState}`">
    {{ totalStock }}
  </div>
</template>

<script>
import ArticleMixin from '/@/mixins/ArticleMixin';

export default {
  name: 'ArticleStockIn',
  mixins: [ArticleMixin],
};
</script>

<style scoped></style>
