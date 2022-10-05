<template>
  <tr>
    <td>
      {{
        `${article.product?.code} / ${article.product?.reference} ${article.name}`
      }}
    </td>
    <td v-if="stockEntryIsCommand">
      <BaseSelect
        v-model="provider_id"
        :options="providers"
        key-label="name"
        :errors="errors?.[`stock_entry_lines.${index}.provider_id`]"
        key-value="id"
      />
    </td>
    <td v-if="stockEntryIsCommand" style="width: 210px">
      <BaseInputGroup
        v-model="provider_price"
        type="number"
        rel="any"
        required
        :errors="errors?.[`stock_entry_lines.${index}.provider_price`]"
        min="0"
        :placeholder="$t('common.attributes.amount')"
      >
        <template #prefix>
          <span class="input-group-text pt-1 pb-1">XAF</span>
        </template>
      </BaseInputGroup>
    </td>
    <td style="width: 120px">
      <BaseInput
        v-model="quantity"
        type="number"
        required
        min="0"
        :errors="errors?.[`stock_entry_lines.${index}.quantity`]"
      />
    </td>
    <td style="width: 210px">
      <BaseInputGroup
        v-model="buying_price"
        type="number"
        rel="any"
        required
        :errors="errors?.[`stock_entry_lines.${index}.buying_price`]"
        min="0"
        :placeholder="$t('common.attributes.amount')"
      >
        <template #prefix>
          <span class="input-group-text pt-1 pb-1">XAF</span>
        </template>
      </BaseInputGroup>
    </td>
    <td>
      <BaseButton
        type="button"
        class="btn btn-iconsolid btn-danger btn-sm"
        :title="$t('common.delete')"
        @click.prevent="$emit('remove', stockEntryLine.article_id)"
      >
        <i class="fa fa-times" />
      </BaseButton>
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
    stockEntryLine: {
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
    ...mapGetters('stock_entry', ['stockEntryIsCommand']),
    ...mapGetters('article', ['getArticleById']),
    ...mapGetters('provider', ['providers']),
    article() {
      return this.getArticleById(this.stockEntryLine.article_id);
    },
    provider_id: {
      get() {
        return this.stockEntryLine.provider_id;
      },
      set(value) {
        return this.updateFieldMethod(
          {
            ...this.stockEntryLine,
            provider_id: value,
          },
          this.index
        );
      },
    },
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
    provider_price: {
      get() {
        return this.stockEntryLine.provider_price;
      },
      set(value) {
        return this.updateFieldMethod(
          {
            ...this.stockEntryLine,
            provider_price: value,
          },
          this.index
        );
      },
    },
    buying_price: {
      get() {
        return this.stockEntryLine.buying_price;
      },
      set(value) {
        return this.updateFieldMethod(
          {
            ...this.stockEntryLine,
            buying_price: value,
          },
          this.index
        );
      },
    },
  },
};
</script>

<style scoped></style>
