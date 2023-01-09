<template>
  <tr>
    <td class="f-w-600">{{ state.label }}</td>
    <td class="text-center">{{ state.total }}</td>
    <td class="text-center">
      {{ `${state.total_buying_price} ${currency}` }}
    </td>
    <td class="text-center">
      {{ `${state.total_price} ${currency}` }}
    </td>
    <td class="text-center">
      {{ `${state.total_price - state.total_buying_price} ${currency}` }}
    </td>
    <td>
      <BaseProgressBar
        style-prop="height: 8px"
        progress-class="progress-bar bg-primary"
        :value="state.total"
        :max="totalArticleStock"
        :show-percent="true"
      />
    </td>
  </tr>
</template>

<script>
import BaseProgressBar from '/@/components/common/BaseProgressBar.vue';

export default {
  name: 'EnterpriseArticleStatTableLine',
  components: { BaseProgressBar },
  props: {
    state: {
      type: Object,
      required: true,
    },
    totalArticleStock: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped></style>
