<template>
  <tr>
    <td>{{ article.id }}</td>
    <td>{{ article.name }}</td>
    <td>
      {{ articleName }}
    </td>
    <td class="text-center">
      <div
        class="span badge rounded-pill"
        :class="`pill-badge-${stockClassState}`"
      >
        {{ article.stock_quantity }}
      </div>
    </td>
    <td class="text-end">{{ `${article.price_value} ${currency}` }}</td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ArticleStatsLineDetails',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('workspace', ['currency']),
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
    articleName() {
      return this.article.product.code
        ? `${this.article.product.code} / ${this.article.product.reference}`
        : this.article.product.reference;
    },
  },
};
</script>

<style scoped></style>
