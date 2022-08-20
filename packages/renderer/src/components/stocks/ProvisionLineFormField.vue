<template>
  <tr>
    <td>{{ provisionLine.article.name }}</td>
    <td>
      {{ provisionLine.provider_name }}
    </td>
    <td>
      {{ provisionLine.requested_quantity }}
    </td>
    <td style="width: 120px">
      <BaseInput v-model.number="quantity" type="number" required min="0" />
    </td>
  </tr>
</template>

<script>
import BaseInput from '/@/components/common/BaseInput.vue';

export default {
  components: { BaseInput },
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
};
</script>

<style scoped></style>
