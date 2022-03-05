<template>
  <ArticleSelectableList
    :used-articles="discount.article_discounts"
    :submit-store-action="submitAddArticlesToDiscountForm"
  >
    <div class="card-header p-3">
      <h5>{{ $t('sales.discount.add_articles') }}</h5>
    </div>
  </ArticleSelectableList>
</template>

<script>
import ArticleSelectableList from '/@/components/articles/ArticleSelectableList.vue';

export default {
  components: {
    ArticleSelectableList,
  },
  props: {
    discount: {
      type: Object,
      required: true,
    },
  },
  methods: {
    submitAddArticlesToDiscountForm(selected) {
      return this.$store.dispatch('discount/addArticles', {
        articles: selected,
        discount: this.discount
      });
    },
  },
};
</script>

<style scoped></style>
