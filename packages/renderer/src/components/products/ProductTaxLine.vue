<template>
  <tr>
    <td>{{ productTax.tax.label }}</td>
    <td>{{ productTax.value }}</td>
    <td class="text-center">
      <BaseButton
        type="button"
        class="btn btn-iconsolid btn-secondary btn-sm"
        :title="$t('common.update')"
        @click.prevent="
          $router.push({
            name: 'products.form.setting.tax.form',
            params: { ...$route.params, product_tax_id: productTax.id },
          })
        "
      >
        <i class="fa fa-edit" />
      </BaseButton>
      <BaseButton
        v-if="!productTax.not_deletable"
        type="button"
        class="btn btn-iconsolid btn-danger btn-sm m-l-10"
        :title="$t('common.delete')"
        @click.prevent="deleteProductTax"
      >
        <i class="fa fa-trash-o" />
      </BaseButton>
    </td>
  </tr>
</template>

<script>
import BaseButton from '../common/BaseButton.vue';

export default {
  components: { BaseButton },
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
