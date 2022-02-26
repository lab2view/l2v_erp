export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    totalEntry() {
      return (
        parseInt(this.article.stock.total_entry) +
        parseInt(this.article.stock.total_entry_composition)
      );
    },
    totalExit() {
      return (
        parseInt(this.article.stock.total_exit) +
        parseInt(this.article.stock.total_exit_composition)
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
