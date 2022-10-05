<template>
  <tr>
    <td>{{ article.name }}</td>
    <td style="width: 120px">
      <BaseInput
        v-model.number="quantity"
        type="number"
        required
        min="0"
        :errors="errors?.[`stock_entry_lines.${index}.quantity`]"
      />
    </td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseInput from '/@/components/common/BaseInput.vue';

export default {
  components: { BaseInput },
  props: {
    stockEntryLine: {
      type: Object,
      required: true,
    },
    index: {
      type: [String, Number],
      required: true,
    },
    errors: {
      type: [Array, Object],
      default: null,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {};
  },
  computed: {
    ...mapGetters('stock_entry', ['stockEntryIsCommand']),
    ...mapGetters('article', ['getArticleById']),
    ...mapGetters('provider', ['providers']),
    article() {
      return this.getArticleById(this.stockEntryLine.article_id);
    },
    quantity: {
      get() {
        return this.stockEntryLine.quantity;
      },
      set: function (value) {
        return this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>

<style scoped></style>
