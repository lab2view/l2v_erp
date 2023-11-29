import { priceTypeCode } from '/@/helpers/codes';

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    articleName() {
      if (this.article.product)
        return this.article.product.code
          ? `${this.article.product.code} / ${this.article.product.reference}`
          : this.article.product.reference;
      else return null;
    },
    haveSalePrice() {
      return (
        this.article?.prices?.find(
          (p) => p.price_type?.code === priceTypeCode.sell
        ) !== undefined
      );
    },
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
      return this.article.stock.available;
    },
    stockClassState() {
      if (
        this.totalStock <= parseInt(this.article?.product?.critical_stock ?? 0)
      )
        return 'danger';
      if (this.totalStock <= parseInt(this.article?.product?.min_stock ?? 0))
        return 'warning';
      if (this.totalStock <= parseInt(this.article?.product?.alert_stock ?? 0))
        return 'info';

      return 'success';
    },
    canSaleWithoutStock() {
      return this.article.can_sale_without_stock;
    },
  },
};
