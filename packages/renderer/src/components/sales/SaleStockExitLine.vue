<template>
  <tr>
    <td>{{ articleName }}</td>
    <td>{{ stockExitLine.quantity }}</td>
    <td>{{ stockExitLine.sup_price }}</td>
    <td>{{ articleDiscount }}</td>
    <td>{{ totalAmount }}</td>
    <td>{{ totalMarge }}</td>
    <td>{{ margePercent }}</td>
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
      return (this.totalMarge * 100) / this.buyPrice;
    },
  },
};
</script>

<style scoped></style>
