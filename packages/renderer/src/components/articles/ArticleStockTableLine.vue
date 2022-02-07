<template>
  <tr>
    <td class="f-w-600">
      {{ article.name }}
    </td>
    <td class="text-center font-primary">{{ article.stock.total_entry }}</td>
    <td class="text-center font-secondary">{{ article.stock.total_exit }}</td>
    <td class="text-center">
      <div
        class="span badge rounded-pill"
        :class="`pill-badge-${stockClassState}`"
      >
        {{ totalStock }}
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    totalStock() {
      return (
        parseInt(this.article.stock.total_entry) -
        parseInt(this.article.stock.total_exit)
      );
    },
    stockClassState() {
      if (this.totalStock <= parseInt(this.article.product.critical_stock))
        return 'danger';
      if (this.totalStock <= parseInt(this.article.product.min_stock))
        return 'warning';
      if (this.totalStock <= parseInt(this.article.product.alert_stock))
        return 'info';

      return 'success';
    },
  },
};
</script>

<style scoped></style>
