<template>
  <tr>
    <td>{{ productTax.tax.label }}</td>
    <td>
      <BaseUpdateNumberForm
        :store-action="updateProductTaxValue"
        :quantity="productTax.value"
      />
    </td>
    <td>
      <div class="row justify-content-center align-items-center">
        <div class="col-md-6 p-0">
          <BaseButton
            type="button"
            class="btn btn-iconsolid btn-info btn-sm"
            :title="$t('common.update')"
            @click.prevent="
              $router.push({
                name: 'productTax.details',
                params: { id: productTax.id },
              })
            "
          >
            <i class="fa fa-edit" />
          </BaseButton>
        </div>
        <div class="col-md-6 p-0">
          <BaseButton
            v-if="!productTax.not_deletable"
            type="button"
            class="btn btn-iconsolid btn-danger btn-sm"
            :title="$t('common.delete')"
            @click.prevent="deleteProductTax"
          >
            <i class="fa fa-trash-o" />
          </BaseButton>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import BaseButton from '../common/BaseButton.vue';
import BaseUpdateNumberForm from '/@/components/common/BaseUpdateNumberForm.vue';
export default {
  components: { BaseUpdateNumberForm, BaseButton },
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
          this.$t('messages.confirmDelete', { label: this.productTax.label })
        )
      )
        this.$store.dispatch('product/deleteTax', this.productTax.id);
    },
    updateProductTaxValue(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped></style>
