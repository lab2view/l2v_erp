<template>
  <tr>
    <td>
      {{ provider?.name || $t('common.not_specify') }}
    </td>
    <td style="width: 240px">{{ article.name }}</td>
    <td class="text-center">
      {{ provisionLine.requested_quantity }}
    </td>
    <td style="width: 140px">
      <BaseUpdateNumberForm
        v-if="provisionLine.id"
        :quantity="quantity"
        :store-action="updateQuantityValue"
        :max="provisionLine.remain_qty"
      />
      <BaseInput
        v-else
        v-model.number="quantity"
        placeholder="Qty"
        type="number"
        :errors="errors?.quantity"
        :max="provisionLine.remain_qty"
      />
    </td>
  </tr>
</template>

<script>
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseUpdateNumberForm from '/@/components/common/BaseUpdateNumberForm.vue';
import { mapGetters } from 'vuex';
import { notify } from '/@/helpers/notify';

export default {
  components: { BaseUpdateNumberForm, BaseInput },
  props: {
    provisionLine: {
      type: Object,
      required: true,
    },
    index: {
      type: [String, Number],
      required: true,
    },
    updateFieldMethod: {
      type: Function,
      required: true,
    },
    errors: {
      type: [Array, Object],
      default: null,
    },
  },

  computed: {
    ...mapGetters('article', ['getArticleById']),
    ...mapGetters('provider', ['getProviderById']),
    article() {
      return this.getArticleById(this.provisionLine.article_id);
    },
    provider() {
      return this.getProviderById(
        this.provisionLine.stock_entry_line?.provider_id
      );
    },
    quantity: {
      get() {
        return this.provisionLine.quantity;
      },
      set(value) {
        return this.updateFieldMethod(
          {
            ...this.provisionLine,
            quantity: value,
          },
          this.index
        );
      },
    },
  },
  methods: {
    updateQuantityValue(quantity) {
      if (this.provisionLine.id && this.provisionLine.remain_qty >= quantity)
        return this.$store.dispatch('stock_entry/updateProvision', {
          ...this.provisionLine,
          quantity: quantity,
        });
      else {
        notify(this.$t('common.errors.quantity_error'), 'Error', 'danger');
        return Promise.resolve();
      }
    },
  },
};
</script>

<style scoped></style>
