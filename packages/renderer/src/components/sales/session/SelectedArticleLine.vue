<template>
  <tr :class="isEscaleMarketWorkspace ? 'f-10' : ''">
    <td class="bd-t-none u-s-tb">
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
            :class="`font-primary f-w-500 ${
              isEscaleMarketWorkspace ? 'f-10' : 'f-12'
            }`"
          >
            {{ article.label }}
            <span :class="`f-10 text-${is_stock ? 'success' : 'danger'}`">
              ({{ totalStock || 0 }})</span
            >
          </div>
        </div>
      </div>
    </td>
    <td class="font-primary" style="width: 200px">
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
    <td>
      <div :style="`width: ${isEscaleMarketWorkspace ? 90 : 140}px`">
        <BaseInputGroup
          v-model.number="quantity"
          type="number"
          min="1"
          :max="canSaleWithoutStock ? null : totalStock"
          class="font-primary text-center m-0 f-w-600 form-control-sm f-40"
        >
          <template #prefix>
            <BaseButton
              :class="
                isEscaleMarketWorkspace
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
            :class="
              isEscaleMarketWorkspace
                ? 'font-secondary border-0'
                : 'input-group-text btn btn-primary btn-iconsolid pt-1 pb-1'
            "
            icon="fa fa-plus"
            icon-class=""
            type="button"
            @click.prevent="incrementArticleQuantity"
          />
        </BaseInputGroup>
      </div>
    </td>
    <td class="font-primary text-start" style="width: 180px">
      <span class="f-w-600"> {{ `${article.sup_price} ${currency}` }}</span>
      <a
        href="#"
        class="float-end text-danger"
        :title="$t('common.delete')"
        @click.prevent="removeArticle"
      >
        <span class="fa fa-times"></span>
      </a>
    </td>
  </tr>
</template>

<script>
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import { getDefaultProductImage } from '/@/helpers/utils.js';
import ArticleMixin from '/@/mixins/ArticleMixin.js';
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { priceTypeCode } from '/@/helpers/codes.js';

export default {
  components: { BaseSelect, BaseButton, BaseInputGroup },
  mixins: [ArticleMixin],
  data() {
    return {
      showFormPriceType: false,
    };
  },
  computed: {
    ...mapGetters('workspace', ['currency', 'isEscaleMarketWorkspace']),
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
        this.$store.commit(
          'cashier_session/UPDATE_CURRENT_REQUEST_ARTICLE_QUANTITY',
          {
            articleId: this.article.article_id,
            quantity: value,
          }
        );
      },
    },
  },
  methods: {
    removeArticle() {
      this.$store.commit(
        'cashier_session/REMOVE_ARTICLE_TO_CURRENT_SALE_REQUEST',
        this.article.article_id
      );
    },
    incrementArticleQuantity() {
      if (
        this.canSaleWithoutStock ||
        parseFloat(this.article.quantity) < this.totalStock
      )
        this.$store.commit(
          'cashier_session/UPDATE_CURRENT_REQUEST_ARTICLE_QUANTITY',
          {
            articleId: this.article.article_id,
            quantity: parseFloat(this.article.quantity) + 1,
          }
        );
    },
    decrementArticleQuantity() {
      if (parseFloat(this.article.quantity) > 1)
        this.$store.commit(
          'cashier_session/UPDATE_CURRENT_REQUEST_ARTICLE_QUANTITY',
          {
            articleId: this.article.article_id,
            quantity: parseFloat(this.article.quantity) - 1,
          }
        );
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
</style>
