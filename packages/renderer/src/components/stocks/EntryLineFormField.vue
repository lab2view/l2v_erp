<template>
  <tr>
    <td
      :title="`${article.product?.code} / ${article.product?.reference} ${article.name}`"
    >
      {{ article.name }}
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
      <BaseInput
        v-model="provider_price"
        type="number"
        rel="any"
        required
        :errors="errors?.[`stock_entry_lines.${index}.provider_price`]"
        min="0"
        :placeholder="$t('common.attributes.amount')"
      />
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
        v-model.number="buying_price"
        type="number"
        rel="any"
        required
        :errors="errors?.[`stock_entry_lines.${index}.buying_price`]"
        min="0"
        :placeholder="$t('common.attributes.amount')"
      >
        <template #prefix>
          <span class="input-group-text f-12">
            {{ $t('common.attributes.buying_price') }}</span
          >
        </template>
      </BaseInputGroup>
      <br />
      <BaseInputGroup
        v-model.number="selling_price"
        type="number"
        rel="any"
        :errors="errors?.[`stock_entry_lines.${index}.selling_price`]"
        min="0"
        :placeholder="$t('common.attributes.amount')"
      >
        <template #prefix>
          <span class="input-group-text pt-1 pb-1 f-12">{{
            $t('common.attributes.selling_price')
          }}</span>
        </template>
      </BaseInputGroup>
    </td>
    <td>
      <BaseDatetime
        v-model="expires_at"
        :placeholder="$t('common.attributes.expires_at')"
        :min-date="new Date()"
      />
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
import { priceTypeCode } from '/@/helpers/codes.js';
import BaseDatetime from '/@/components/common/BaseDatetime.vue';
import { getEnterprisePriceByTypeCode } from '/@/helpers/utils';

export default {
  components: {
    BaseDatetime,
    BaseInputGroup,
    BaseButton,
    BaseInput,
    BaseSelect,
  },
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
    enterpriseId: {
      type: Number,
      default: null,
    },
  },
  emits: ['remove'],
  computed: {
    ...mapGetters('workspace', ['currency']),
    ...mapGetters('stock_entry', ['stockEntryIsCommand']),
    ...mapGetters('article', ['getArticleById']),
    ...mapGetters('provider', ['providers']),
    article() {
      return this.getArticleById(this.stockEntryLine.article_id);
    },
    articleBuyingPrice() {
      if (this.article?.prices.length) {
        const price = getEnterprisePriceByTypeCode(
          this.article.prices,
          priceTypeCode.buy,
          this.enterpriseId
        );
        return price?.value ?? null;
      } else return null;
    },
    articleSellingPrice() {
      if (this.article?.prices.length) {
        const price = getEnterprisePriceByTypeCode(
          this.article.prices,
          priceTypeCode.sell,
          this.enterpriseId
        );
        return price?.value ?? null;
      } else return null;
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
    selling_price: {
      get() {
        return this.stockEntryLine.selling_price;
      },
      set(value) {
        return this.updateFieldMethod(
          {
            ...this.stockEntryLine,
            selling_price: value,
          },
          this.index
        );
      },
    },
    expires_at: {
      get() {
        return this.stockEntryLine.expires_at;
      },
      set(date) {
        return this.updateFieldMethod(
          {
            ...this.stockEntryLine,
            expires_at: date,
          },
          this.index
        );
      },
    },
  },
  mounted() {
    if (this.articleBuyingPrice || this.articleSellingPrice) {
      this.updateFieldMethod(
        {
          ...this.stockEntryLine,
          selling_price: this.articleSellingPrice,
          buying_price: this.articleBuyingPrice,
        },
        this.index
      );
    }
  },
};
</script>

<style scoped></style>
