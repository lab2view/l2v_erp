<template>
  <tr>
    <td>{{ article.name }}</td>
    <td style="width: 120px">
      <BaseInput
        v-model="quantity"
        type="number"
        required
        min="0"
        :errors="errors?.[`.${index}.quantity`]"
      />
    </td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';

export default {
  components: { BaseInputGroup, BaseButton, BaseInput, BaseSelect },
  props: {
    article: {
      type: Object,
      required: false,
    },
    index: {
      type: [String, Number],
      required: false,
    },
    errors: {
      type: [Array, Object],
      default: null,
    },
  },
  data(){
    return{
      stockEntryLine: {
        article_id: null,
        provider_price: null,
        buying_price: null,
        provider_id: null,
        stock_entry_id: null
      },
    }
  },
  emits: ['remove'],
  computed: {
    ...mapGetters('stock_entry', ['stockEntryIsCommand']),
    ...mapGetters('article', ['getArticleById']),
    ...mapGetters('provider', ['providers']),
    quantity: {
      get() {
        return this.stockEntryLine.quantity;
      },
      set(value) {
        return this.updateFieldMethod(
          {
            ...this.stockEntryLine,
            quantity: value,
          },
          this.index
        );
      },
    },

  },
};
</script>

<style scoped></style>
