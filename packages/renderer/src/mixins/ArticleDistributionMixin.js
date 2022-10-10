export default {
  props: {
    distribution: {
      type: Object,
      required: true,
    },
  },

  computed: {
    totalEntry() {
      return (
        parseInt(this.distribution?.total_entry ?? 0) +
        parseInt(this.distribution?.total_entry_composition ?? 0)
      );
    },
    totalExit() {
      return (
        parseInt(this.distribution?.total_exit ?? 0) +
        parseInt(this.distribution?.total_exit_composition ?? 0)
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
