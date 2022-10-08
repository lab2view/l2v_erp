<template>
  <div class="card">
    <BaseTableHeader
      :title="$t('articles.listTitle')"
      :refresh-action-field="{ page: 1, field: { paginate: 50, next: true } }"
      refresh-action-name="article/getArticlesList"
    />
    <div class="card-body">
      <BaseDatatable :tfoot="false" :total="articles.length">
        <template #headers>
          <th>#</th>
          <th>{{ $t('common.attributes.product_id') }}</th>
          <th>{{ $t('common.attributes.name') }}</th>
          <th class="text-center">{{ $t('common.headers.stock_in') }}</th>
          <th>{{ $t('common.attributes.reference') }}</th>
        </template>
        <tr v-for="article in selectedArticles" :key="article.id">
          <td>{{ article.id }}</td>
          <td>{{ article.product.name }}</td>
          <td>{{ article.name }}</td>
          <td class="text-center">
            <ArticleStockIn :article="article" />
          </td>
          <td>
            {{ `${article.product.code} / ${article.product.reference}` }}
          </td>
        </tr>
      </BaseDatatable>
    </div>

    <router-view />
  </div>
</template>

<script>
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import ArticleStockIn from '/@/components/articles/ArticleStockIn.vue';
import store from '/@/store/index.js';
import { mapGetters } from 'vuex';
import {
  getDistributionCurrentStock,
  getStockExitLineArticleStock,
} from '/@/helpers/utils.js';
export default {
  name: 'EnterpriseArticleStats',
  components: { ArticleStockIn, BaseDatatable, BaseTableHeader },
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
    ...mapGetters('article', ['articles']),
    selectedArticles() {
      return this.articles.filter((art) => {
        const distribution = art.stats.distributions.find(
          (d) => d.id === parseInt(this.$route.params.enterprise_id)
        );
        if (distribution !== undefined) {
          return getDistributionCurrentStock(distribution) > 0;
        } else return getStockExitLineArticleStock(art) > 0;
      });
    },
  },
};
</script>

<style scoped></style>
