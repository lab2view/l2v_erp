<template>
  <tr v-if="stockExitLine.id === null || isMultiple">
    <td class="align-middle f-w-600 f-14">
      {{
        `${article.product?.code} / ${article.product?.reference} ${article.name}`
      }}
      <span class="m-l-5">x{{ stockAvailable }}</span>
    </td>
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
    <td :style="isMultiple ? 'width: 400px' : 'width: 120px'">
      <div v-if="isMultiple">
        <div
          v-for="stockExit in getMultipleStockExits"
          :key="`stock-multi-${stockExit.id}`"
          class="mb-2 row"
        >
          <div class="col-sm-4">
            <BaseInput
              v-model="quantities[stockExit.id]"
              type="number"
              required
              placeholder="Qte"
              min="1"
              :max="stockAvailable"
              :errors="
                errors?.[`${stockExit.id}.stock_exit_lines.${index}.quantity`]
              "
            />
          </div>
          <label class="col-sm-auto col-form-label text-end">
            {{ stockExit.enterprise_receiver.name }}
          </label>
        </div>
      </div>
      <BaseInput
        v-else
        v-model.number="quantity"
        type="number"
        required
        min="1"
        :max="stockAvailable"
        :errors="errors?.[`stock_exit_lines.${index}.quantity`]"
      />
    </td>
    <td class="align-middle">
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
import { getDistributionCurrentStock } from '/@/helpers/utils.js';

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
    enterpriseId: {
      type: Number,
      default: null,
    },
    updateFieldMethod: {
      type: Function,
      required: true,
    },
    errors: {
      type: [Array, Object],
      default: null,
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['remove'],
  data() {
    return {
      quantities: {},
    };
  },
  computed: {
    ...mapGetters('stock_exit', ['manage_price', 'getMultipleStockExits']),
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
    stockAvailable() {
      if (this.article) {
        const distribution = this.article.stats.distributions.find(
          (d) => d.id === this.enterpriseId
        );
        return distribution !== undefined
          ? getDistributionCurrentStock(distribution)
          : this.article.stock.available;
      } else return null;
    },
  },
  watch: {
    quantities: {
      deep: true,
      handler(value) {
        this.updateFieldMethod(
          {
            ...this.stockExitLine,
            quantities: value,
          },
          this.index
        );
      },
    },
  },
};
</script>

<style scoped></style>
