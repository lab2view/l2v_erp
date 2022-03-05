<template>
  <tr>
    <td>{{ priceType.label }}</td>
    <td style="width: 250px">
      <BaseUpdateNumberForm
        prefix="XAF"
        field-name="prices"
        :quantity="price ? price.value : 1"
        :store-action="updatePriceValue"
      />
    </td>
  </tr>
</template>

<script>
import ArticleMixin from '/@/mixins/ArticleMixin.js';
import BaseUpdateNumberForm from '/@/components/common/BaseUpdateNumberForm.vue';

export default {
  components: { BaseUpdateNumberForm },
  mixins: [ArticleMixin],
  props: {
    priceType: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    price() {
      const price = this.article.prices.find(
        (p) => p.price_type_id === this.priceType.id
      );
      if (price !== undefined) return price;
      return null;
    },
  },

  methods: {
    updatePriceValue(value) {
      if (this.price) {
        return this.$store.dispatch('article/updatePrice', {
          ...this.price,
          value,
        });
      } else {
        return this.$store.dispatch('article/addPrices', {
          prices: [{ value: value, price_type_id: this.priceType.id }],
        });
      }
    },
  },
};
</script>

<style scoped></style>
