<template>
  <tr>
    <td>{{ article.name }}</td>
    <td v-if="manage_price" style="width: 210px">
      <BaseInputGroup
        v-model="provisionLine.price"
        type="number"
        rel="any"
        required
        min="0"
        :placeholder="$t('common.attributes.amount')"
      >
        <template #prefix>
          <span class="input-group-text pt-1 pb-1">XAF</span>
        </template>
      </BaseInputGroup>
    </td>
    <td style="width: 120px">
      {{provider.name}}
    </td>
    <td style="width: 120px">
      <BaseInput
        v-model="provisionLine.quantity"
        type="number"
        required
        min="0"
        disabled
      />
    </td>
    <td style="width: 120px">
      <BaseInput
        v-model="quantity"
        type="number"
        required
        min="0"
      />
    </td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';

export default {
  components: { BaseInputGroup, BaseButton, BaseInput },
  props: {
    provisionLine: {
      type: Object,
      required: true,
    },

    provisionForm: {
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
  emits: ['remove'],
  computed: {
    ...mapGetters('stock_exit', ['manage_price']),
    ...mapGetters('article', ['getArticleById']),
    ...mapGetters('provider', ['getProviderById']),
    article() {
      return this.getArticleById(this.provisionLine.article_id);
    },
    provider() {
      return this.getProviderById(this.provisionLine.provider_id);
    },
    quantity: {
      get() {
        return this.provisionForm.quantity;
      },
      set(value) {
        return this.updateFieldMethod(
          {
            ...this.provisionForm,
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
