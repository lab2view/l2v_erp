<template>
  <tr
    :class="{
      'f-10 p-1': saleScreenSmall,
      'bg-light-primary': article.is_active,
    }"
  >
    <td class="bd-t-none u-s-tb" :class="tableLineClass">
      <div class="media">
        <a
          href="#"
          @click.prevent="
            $router.push({
              name: 'sales.session.picture',
              params: { article_id: article.article_id },
            })
          "
        >
          <img
            v-if="article.image && article.image !== ''"
            class="img-30 rounded-circle"
            :src="article.image"
            :alt="article.article_id"
            :title="article.label"
          />
        </a>
        <div class="media-body m-l-10">
          <div
            :class="`font-primary f-w-500 ${saleScreenSmall ? 'f-10' : 'f-12'}`"
          >
            {{ article.label }}
            <span :class="`f-10 text-${is_stock ? 'success' : 'danger'}`">
              ({{ totalStock || 0 }})</span
            >
          </div>
        </div>
      </div>
    </td>
    <td class="font-primary" :class="tableLineClass">
      <BaseSelect
        v-if="showFormPriceType"
        v-model.number="salePriceTypeField"
        label-class="col-form-label font-primary pt-0"
        class="form-select digits font-primary"
        :options="articleSalePriceTypes"
        key-label="label"
        key-value="id"
      />
      <span v-else>
        {{ `${article.price} ${currency}` }}
      </span>
      <a
        v-if="articleSalePriceTypes.length > 1 && !showFormPriceType"
        href="#"
        :title="$t('common.update_price')"
        class="font-secondary m-l-5 f-16 fa fa-edit"
        @click.prevent="showFormPriceType = true"
      />
    </td>
    <td :class="tableLineClass">
      <div :style="`width: ${saleScreenSmall ? 95 : 140}px`">
        <BaseInputGroup
          v-model.number="quantity"
          type="number"
          :autofocus="article.is_active"
          min="1"
          :max="canSaleWithoutStock ? null : totalStock"
          class="font-primary text-center m-0 f-w-600 form-control-sm f-40"
        >
          <template #prefix>
            <BaseButton
              :class="
                saleScreenSmall
                  ? 'font-secondary border-0'
                  : 'input-group-text btn btn-primary btn-iconsolid pt-1 pb-1'
              "
              icon="fa fa-minus"
              icon-class=""
              type="button"
              @click.prevent="decrementArticleQuantity"
            />
          </template>
          <BaseButton
            v-if="!canProcessToPack"
            :class="
              saleScreenSmall
                ? 'font-secondary border-0'
                : 'input-group-text btn btn-primary btn-iconsolid pt-1 pb-1'
            "
            icon="fa fa-plus"
            icon-class=""
            type="button"
            @click.prevent="incrementArticleQuantity"
          />
          <BaseButton
            v-else
            :class="
              saleScreenSmall
                ? 'font-primary border-0'
                : 'input-group-text btn btn-secondary btn-iconsolid pt-1 pb-1'
            "
            :icon="processLoading ? 'fa fa-spin fa-refresh' : 'fa fa-check'"
            icon-class=""
            type="button"
            :disabled="processLoading"
            @click.prevent="
              $emit('packing', {
                article: {
                  id: article.article_id,
                  label: article.label,
                  stock: article.stock,
                },
                packable_articles,
              })
            "
          />
        </BaseInputGroup>
      </div>
    </td>
    <td
      class="font-primary text-start"
      :class="tableLineClass"
      :style="`width: ${saleScreenSmall ? 130 : 180}px`"
    >
      <span class="f-w-600"> {{ `${article.sup_price} ${currency}` }}</span>
      <a
        href="#"
        class="float-end text-danger"
        :class="saleScreenSmall ? ' f-14' : ''"
        :title="$t('common.delete')"
        @click.prevent="$emit('delete')"
      >
        <span class="fa fa-times"></span>
      </a>
    </td>
  </tr>
</template>

<script>
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import { getDefaultProductImage } from '/@/helpers/utils';
import ArticleMixin from '/@/mixins/ArticleMixin';
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { priceTypeCode } from '/@/helpers/codes';

export default {
  name: 'SelectedArticleLine',
  components: { BaseSelect, BaseButton, BaseInputGroup },
  mixins: [ArticleMixin],
  props: {
    index: { type: Number, default: null },
    processLoading: { type: Boolean, default: false },
  },
  emits: ['updated', 'delete', 'packing'],
  data() {
    return {
      showFormPriceType: false,
      animation: false,
      line_focus: false,
    };
  },
  computed: {
    ...mapGetters('workspace', ['currency', 'saleScreenSmall']),
    ...mapGetters('article', ['getProductArticles']),
    ...mapGetters('cashier_session', ['currentSessionEnterpriseId']),
    articleSalePriceTypes() {
      return this.article.prices
        .map((p) => {
          return {
            label: p.price_type.label,
            id: p.price_type.id,
            code: p.price_type.code,
          };
        })
        .filter((pt) => pt.code !== priceTypeCode.buy);
    },
    price() {
      return (
        this.article.prices.find((p) => p.id === this.article.price_id) ?? null
      );
    },
    salePriceTypeField: {
      get() {
        return this.price.price_type_id;
      },
      set(value) {
        const price = this.article.prices.find(
          (p) => p.price_type_id === value
        );
        if (price !== undefined && price.id !== this.article.price_id) {
          this.$store.commit(
            'cashier_session/UPDATE_CURRENT_SALE_REQUEST_ARTICLE',
            {
              ...this.article,
              price_id: price.id,
              price: price.value,
              sup_price:
                parseFloat(this.article.quantity) * parseFloat(price.value),
            }
          );
        }
        this.showFormPriceType = false;
      },
    },
    articleDefaultImage() {
      return getDefaultProductImage;
    },
    is_stock() {
      return this.totalStock > 0;
    },
    quantity: {
      get() {
        return this.article.quantity;
      },
      set(value) {
        this.line_focus = true;
        this.$store.commit(
          'cashier_session/UPDATE_CURRENT_REQUEST_ARTICLE_QUANTITY',
          {
            articleId: this.article.article_id,
            quantity: value,
          }
        );
      },
    },
    tableLineClass() {
      return this.saleScreenSmall ? 'p-1' : '';
    },
    packable_articles() {
      return this.getProductArticles(
        { id: this.article.article_id, product_id: this.article.product_id },
        this.currentSessionEnterpriseId
      );
    },
    canProcessToPack() {
      return (
        this.totalStock <= 0 &&
        !this.canSaleWithoutStock &&
        this.packable_articles.length > 0
      );
    },
  },
  watch: {
    article: {
      deep: true,
      handler() {
        this.$emit('updated');
        if (this.line_focus) this.resetFocusLine();
      },
    },
  },
  mounted() {
    this.$emit('updated');
  },
  methods: {
    resetFocusLine() {
      setTimeout(() => (this.line_focus = false), 1000);
    },
    incrementArticleQuantity() {
      if (
        this.canSaleWithoutStock ||
        parseFloat(this.article.quantity) < this.totalStock
      ) {
        this.line_focus = true;
        this.$store.commit(
          'cashier_session/UPDATE_CURRENT_REQUEST_ARTICLE_QUANTITY',
          {
            articleId: this.article.article_id,
            quantity: parseFloat(this.article.quantity) + 1,
          }
        );
      }
    },
    decrementArticleQuantity() {
      if (parseFloat(this.article.quantity) > 1) {
        this.line_focus = true;
        this.$store.commit(
          'cashier_session/UPDATE_CURRENT_REQUEST_ARTICLE_QUANTITY',
          {
            articleId: this.article.article_id,
            quantity: parseFloat(this.article.quantity) - 1,
          }
        );
      }
    },
  },
};
</script>

<style scoped>
.f-10 {
  font-size: 10px;
}
.f-8 {
  font-size: 8px;
}

.bg-light-primary {
  background-color: rgba(186, 137, 93, 0.1);
}
</style>
