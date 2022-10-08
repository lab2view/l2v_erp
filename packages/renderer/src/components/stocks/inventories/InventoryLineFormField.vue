<template>
  <tr v-if="!inventoryLine.id">
    <td>
      {{
        `${article.product?.code} / ${article.product?.reference} ${article.name}`
      }}
    </td>
    <td class="text-center">
      {{ article.stock.available }}
    </td>
    <td style="width: 120px">
      <BaseInput
        v-model.number="new_value"
        type="number"
        required
        placeholder="eg. 10"
        min="0"
        :errors="errors?.[`inventory_lines.${index}.new_value`]"
      />
    </td>
    <td>
      <BaseButton
        type="button"
        class="btn btn-iconsolid btn-danger btn-sm"
        :title="$t('common.delete')"
        @click.prevent="$emit('remove', inventoryLine.article_id)"
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

export default {
  components: { BaseButton, BaseInput },
  props: {
    inventoryLine: {
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
    ...mapGetters('article', ['getArticleById']),
    article() {
      return this.getArticleById(this.inventoryLine.article_id);
    },
    new_value: {
      get() {
        return this.inventoryLine.new_value;
      },
      set(value) {
        return this.updateFieldMethod(
          {
            ...this.inventoryLine,
            new_value: value,
          },
          this.index
        );
      },
    },
  },
  created() {
    this.updateFieldMethod(
      {
        ...this.inventoryLine,
        old_value: this.article.stock.available,
      },
      this.index
    );
  },
};
</script>

<style scoped></style>
