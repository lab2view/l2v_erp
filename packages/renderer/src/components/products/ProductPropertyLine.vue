<template>
  <tr>
    <td>{{ productProperty.property.label }}</td>
    <td>{{ productProperty.value }}</td>
    <td class="text-center">
      <BaseButton
        type="button"
        class="btn btn-iconsolid btn-secondary btn-sm"
        :title="$t('common.update')"
        @click.prevent="
          $router.push({
            name: 'product.form.setting.property.form',
            params: {
              ...$route.params,
              product_property_id: productProperty.id,
            },
          })
        "
      >
        <i class="fa fa-edit" />
      </BaseButton>
      <BaseButton
        v-if="!productProperty.not_deletable"
        type="button"
        class="btn btn-iconsolid btn-danger btn-sm m-l-10"
        :title="$t('common.delete')"
        @click.prevent="deleteProductProperty"
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
