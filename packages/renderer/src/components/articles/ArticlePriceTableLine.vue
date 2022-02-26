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
    <td class="text-center">
      <BaseButton
        v-if="price"
        type="button"
        class="btn btn-iconsolid btn-danger btn-sm"
        :title="$t('common.delete')"
        :loading="loading"
        @click.prevent="removePrice"
      >
        <i v-if="!loading" class="fa fa-times" />
      </BaseButton>
      <em v-else>{{ $t('common.no_action') }}</em>
    </td>
  </tr>
</template>

<script>
import ArticleMixin from '/@/mixins/ArticleMixin.js';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseUpdateNumberForm from '/@/components/common/BaseUpdateNumberForm.vue';

export default {
  components: { BaseUpdateNumberForm, BaseButton },
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
    removePrice() {
      console.log('delete price');
    },

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
