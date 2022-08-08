<template>
  <BaseButton
    v-if="!haveSalePrice"
    type="button"
    class="btn btn-iconsolid btn-warning btn-sm m-l-5"
    :title="$t('common.configure')"
    @click.prevent="
      $router.push({
        name: 'article.prices',
        params: { id: article.id },
      })
    "
  >
    <i class="fa fa-exclamation-triangle" />
  </BaseButton>
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import { priceTypeCode } from '/@/helpers/codes';
export default {
  components: { BaseButton },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    haveSalePrice() {
      return (
        this.article.prices.find(
          (p) => p.price_type.code === priceTypeCode.sell
        ) !== undefined
      );
    },
  },
};
</script>

<style scoped></style>
