<template>
  <tr>
    <td>{{ priceType.label }}</td>
    <td>
      <div class="row align-content-center">
        <div class="col">{{ priceStateLabel }}</div>
        <div class="col-auto">
          <a
            v-if="customPrice"
            href="#"
            class="text-danger"
            :title="$t('messages.delete_specific_price')"
            @click.prevent="removeCustomPrice"
          >
            <i class="fa fa-times m-r-5" /> Retirer
          </a>
        </div>
      </div>
    </td>
    <td style="width: 250px">
      <BaseUpdateNumberForm
        prefix="XAF"
        field-name="prices"
        :quantity="priceValue"
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
    enterpriseId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    price() {
      const price = this.article?.prices?.find(
        (p) => p.price_type_id === this.priceType.id
      );
      if (price !== undefined) return price;
      return null;
    },

    customPrice() {
      if (this.enterpriseId) {
        if (this.price?.customs?.length) {
          const custom = this.price.customs.find(
            (cp) =>
              cp.enterprise_id === this.enterpriseId &&
              cp.price_id === this.price.id
          );
          if (custom !== undefined) return custom;
        }
      }
      return null;
    },

    priceValue() {
      return this.customPrice
        ? this.customPrice.value
        : this.price
        ? this.price.value
        : 1;
    },

    priceStateLabel() {
      return this.price && this.customPrice
        ? this.$t('common.states.custom_price')
        : this.$t('common.states.global_price');
    },
  },
  methods: {
    updatePriceValue(value) {
      if (this.price) {
        if (this.enterpriseId) {
          if (this.customPrice)
            return this.$store.dispatch('article/updateCustomPrice', {
              ...this.customPrice,
              value,
            });
          else
            return this.$store.dispatch('article/addCustomPrice', {
              customPrice: {
                value: value,
                enterprise_id: this.enterpriseId,
              },
              price_id: this.price.id,
            });
        } else
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
    removeCustomPrice() {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: this.customPrice.value })
        )
      ) {
        return this.$store.dispatch(
          'article/removeCustomPrice',
          this.customPrice.id
        );
      }
    },
  },
};
</script>

<style scoped></style>
