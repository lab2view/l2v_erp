<template>
  <tr>
    <td>{{ article.name }}</td>
    <td v-if="manage_price" style="width: 210px">
      <BaseInputGroup
        v-model="price"
        type="number"
        rel="any"
        required
        :errors="errors?.[`stock_exit_lines.${index}.price`]"
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
        :errors="errors?.[`stock_exit_lines.${index}.quantity`]"
      />
    </td>
    <td>
      <BaseButton
        type="button"
        class="btn btn-iconsolid btn-danger btn-sm"
        :title="$t('common.delete')"
        @click.prevent="$emit('remove', stockExitLine.article_id)"
      >
        <i class="fa fa-times" />
      </BaseButton>
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
    stockExitLine: {
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
    article() {
      return this.getArticleById(this.stockExitLine.article_id);
    },
    quantity: {
      get() {
        return this.stockExitLine.quantity;
      },
      set(value) {
        return this.updateFieldMethod(
          {
            ...this.stockExitLine,
            quantity: value,
          },
          this.index
        );
      },
    },
    price: {
      get() {
        return this.stockExitLine.price;
      },
      set(value) {
        return this.updateFieldMethod(
          {
            ...this.stockExitLine,
            price: value,
          },
          this.index
        );
      },
    },
  },
};
</script>

<style scoped></style>
