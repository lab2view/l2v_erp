<template>
  <tr>
    <td>{{ articleName }}</td>
    <td>{{ stockExitLine.quantity }}</td>
    <td>{{ stockExitLine.sup_price }}</td>
    <td>{{ articleDiscount }}</td>
    <td>{{ totalAmount }}</td>
    <td v-if="!isCashierSession">{{ totalMarge }}</td>
    <td v-if="!isCashierSession">{{ margePercent.toFixed(2) }}</td>
  </tr>
</template>

<script>
import { priceTypeCode } from '/@/helpers/codes.js';

export default {
  name: 'SaleStockExitLine',
  props: {
    stockExitLine: {
      type: Object,
      required: true,
    },
    isCashierSession: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    articleName() {
      return `${this.stockExitLine?.article.product?.code} / ${this.stockExitLine?.article.product?.reference} ${this.stockExitLine?.article.name}`;
    },
    articleDiscount() {
      return this.stockExitLine.discount ?? '0';
    },
    totalAmount() {
      return (
        parseFloat(this.stockExitLine.sup_price ?? 0) -
        parseFloat(this.articleDiscount)
      ).toFixed(0);
    },
    buyPrice() {
      const price = this.stockExitLine.article?.prices?.find(
        (p) => p.price_type.code === priceTypeCode.buy
      );
      return price !== undefined ? price.value : 0;
    },
    totalMarge() {
      return (
        this.totalAmount -
        parseFloat(this.stockExitLine.quantity) * this.buyPrice
      );
    },
    margePercent() {
      return (this.totalMarge * 100) / this.totalAmount;
    },
  },
};
</script>

<style scoped></style>
