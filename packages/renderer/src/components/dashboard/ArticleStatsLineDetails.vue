<template>
  <tr>
    <td>{{ article.id }}</td>
    <td>{{ article.name }}</td>
    <td>
      {{ `${article.product.code} / ${article.product.reference}` }}
    </td>
    <td class="text-center">
      <div
        class="span badge rounded-pill"
        :class="`pill-badge-${stockClassState}`"
      >
        {{ article.stock_quantity }}
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ArticleStatsLineDetails',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    stockClassState() {
      if (
        this.article.stock_quantity <=
        parseInt(this.article.product.critical_stock)
      )
        return 'danger';
      if (
        this.article.stock_quantity <= parseInt(this.article.product.min_stock)
      )
        return 'warning';
      if (
        this.article.stock_quantity <=
        parseInt(this.article.product.alert_stock)
      )
        return 'info';

      return 'success';
    },
  },
};
</script>

<style scoped></style>
