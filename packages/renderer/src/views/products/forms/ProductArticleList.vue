<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <router-view />
    </div>
  </div>
  <div class="card mb-0">
    <BaseTableHeader
      :title="`${$t('articles.listTitle')} - ${product.reference}`"
      :add-action-router-name="
        $route.name === 'product.form.article'
          ? 'product.form.article.form'
          : null
      "
      :params="$route.params"
      entity="Article"
    />
    <div class="card-body">
      <div class="user-status table-responsive">
        <table class="table table-bordernone">
          <thead>
            <tr>
              <th scope="col">{{ $t('common.attributes.package_id') }}</th>
              <th scope="col" class="text-center">
                {{ $t('common.attributes.quantity') }}
              </th>
              <th scope="col">{{ $t('common.attributes.description') }}</th>
              <th scope="col">{{ $t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <ProductArticleLine
              v-for="(article, index) in articles"
              :key="index"
              :article="article"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '../../../store';
import ProductArticleLine from '../../../components/products/ProductArticleLine.vue';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  name: 'ProductArticleList',
  components: { BaseTableHeader, ProductArticleLine },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('article/getArticlesList', {
        page: 1,
        field: {},
      })
      .then(() => {
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  computed: {
    ...mapGetters('product', ['product']),
    ...mapGetters('article', ['getArticleByProductId']),
    articles() {
      return this.getArticleByProductId(this.product.id);
    },
  },
};
</script>

<style scoped></style>
