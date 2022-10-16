<template>
  <tr>
    <td>
      {{
        `${article.product?.code} / ${article.product?.reference} ${article.name}`
      }}
    </td>
    <td style="width: 120px">
      <BaseInput
        v-model.number="quantity"
        type="number"
        required
        min="1"
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
          <span class="input-group-text pt-1 pb-1">{{ currency }}</span>
        </template>
      </BaseInputGroup>
    </td>
    <td v-if="showRemoveAction">
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
import BaseInput from '/@/components/common/BaseInput.vue';
import { priceTypeCode } from '/@/helpers/codes.js';
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  name: 'ProductEntryLineFormField',
  components: { BaseButton, BaseInputGroup, BaseInput },
  props: {
    stockEntryLine: {
      type: Object,
      required: true,
    },
    updateFieldMethod: {
      type: Function,
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
    showRemoveAction: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['remove'],
  computed: {
    ...mapGetters('workspace', ['currency']),
    ...mapGetters('article', ['getArticleById']),
    article() {
      return this.getArticleById(this.stockEntryLine.article_id);
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
    articlePrice() {
      return this.article?.prices?.find(
        (p) => p.price_type.code === priceTypeCode.buy
      );
    },
  },
  created() {
    if (this.articlePrice) {
      this.buying_price = this.articlePrice.value;
    }
  },
};
</script>

<style scoped></style>
