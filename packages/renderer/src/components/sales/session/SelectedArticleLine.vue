<template>
  <tr>
    <td class="bd-t-none u-s-tb">
      <div class="media">
        <img
          class="img-20 me-4 rounded-circle"
          :src="article.image ?? articleDefaultImage"
          :alt="article.article_id"
          :title="article.label"
        />
        <div class="media-body">
          <div class="font-primary f-w-500 f-12">
            {{ article.label }}
            <span :class="`f-10 text-${is_stock ? 'success' : 'danger'}`">
              ({{ totalStock || 0 }})</span
            >
          </div>
        </div>
      </div>
    </td>
    <td class="font-primary" style="width: 190px">
      {{ `${article.price} ${currency}` }}
      <span class="font-secondary m-l-5 fa fa-edit" />
    </td>
    <td>
      <div style="width: 140px">
        <BaseInputGroup
          v-model.number="quantity"
          type="number"
          min="1"
          :max="totalStock"
          class="font-primary text-center m-0 f-w-600 form-control-sm f-40"
        >
          <template #prefix>
            <BaseButton
              class="input-group-text btn btn-primary btn-iconsolid pt-1 pb-1"
              icon="fa fa-minus"
              icon-class=""
              type="button"
              @click.prevent="decrementArticleQuantity"
            />
          </template>
          <BaseButton
            class="input-group-text btn btn-primary btn-iconsolid pt-1 pb-1"
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
export default {
  components: { BaseButton, BaseInputGroup },
  mixins: [ArticleMixin],
  computed: {
    ...mapGetters('workspace', ['currency']),
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
      if (parseFloat(this.article.quantity) < this.totalStock)
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

<style scoped></style>
