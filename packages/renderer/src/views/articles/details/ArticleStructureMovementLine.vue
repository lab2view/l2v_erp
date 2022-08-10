<template>
  <tr>
    <td>
      <div class="media">
        <div class="media-body">
          <a href="#">
            <span>{{ distribution.name }}</span>
          </a>
        </div>
      </div>
    </td>
    <td class="font-primary">
      {{ totalEntry }}
    </td>
    <td class="font-secondary">
      {{ totalExit }}
    </td>
    <td>
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
import { mapGetters } from 'vuex';

export default {
  props: {
    distribution: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('article', ['article']),
    totalEntry() {
      return (
        parseInt(this.distribution.total_entry ?? 0) +
        parseInt(this.distribution.total_entry_composition ?? 0)
      );
    },
    totalExit() {
      return (
        parseInt(this.distribution.total_exit ?? 0) +
        parseInt(this.distribution.total_exit_composition ?? 0)
      );
    },
    totalStock() {
      return this.totalEntry - this.totalExit;
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
