<template>
  <tr>
    <td>{{ productProperty.property.label }}</td>
    <td>
      <PropertyLineValue
        :value="productProperty.value"
        :property="productProperty.property"
      />
    </td>
    <td class="text-center">
      <BaseActionBtnGroup
        entity="ProductProperty"
        :with-show-btn="false"
        :with-delete-btn="!productProperty.not_deletable"
        @update="
          $router.push({
            name: 'product.form.setting.property.form',
            params: {
              ...$route.params,
              product_property_id: productProperty.id,
            },
          })
        "
        @delete="deleteProductProperty"
      />
    </td>
  </tr>
</template>

<script>
import PropertyLineValue from '/@/components/products/PropertyLineValue.vue';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';

export default {
  components: { BaseActionBtnGroup, PropertyLineValue },
  props: {
    productProperty: {
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
    deleteProductProperty() {
      if (
        confirm(
          this.$t('messages.confirmDelete', {
            label: this.productProperty.property.label,
          })
        )
      ) {
        this.loading = true;
        this.$store
          .dispatch('product/removeProperties', [this.productProperty.id])
          .finally(() => (this.loading = false));
      }
    },
    updateProductPropertyValue(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped></style>
