<template>
  <tr>
    <td>{{ productTax.tax.label }}</td>
    <td>
      {{ productTax.value }}
      <span v-if="productTax.is_percent">%</span>
    </td>
    <td class="text-center">
      <BaseActionBtnGroup
        entity="ProductTax"
        :with-show-btn="false"
        :with-delete-btn="!productTax.not_deletable"
        @update="
          $router.push({
            name: 'product.form.setting.tax.form',
            params: { ...$route.params, product_tax_id: productTax.id },
          })
        "
        @delete="deleteProductTax"
      />
    </td>
  </tr>
</template>

<script>
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';

export default {
  components: { BaseActionBtnGroup },
  props: {
    productTax: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    deleteProductTax() {
      if (
        confirm(
          this.$t('messages.confirmDelete', {
            label: this.productTax.tax.label,
          })
        )
      ) {
        this.loading = true;
        this.$store
          .dispatch('product/removeTaxes', [this.productTax.id])
          .finally(() => (this.loading = false));
      }
    },
    updateProductTaxValue(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped></style>
