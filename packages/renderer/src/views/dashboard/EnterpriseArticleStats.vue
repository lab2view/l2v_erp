<template>
  <div v-if="canShowEnterpriseArticleLineStats" class="card">
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
        <ArticleStatsLineDetails
          v-for="article in articles"
          :key="`art-stat-lne-${article.id}`"
          :article="article"
          :enterprise-id="$route.params.enterprise_id"
        />
      </BaseDatatable>
    </div>

    <router-view />
  </div>
</template>

<script>
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '/@/store/index';
import { mapGetters } from 'vuex';
import ArticleStatsLineDetails from '/@/components/dashboard/ArticleStatsLineDetails.vue';

export default {
  name: 'EnterpriseArticleStats',
  components: {
    ArticleStatsLineDetails,
    BaseDatatable,
    BaseTableHeader,
  },
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
    ...mapGetters('auth', ['canShowMenuItem']),
    canShowEnterpriseArticleLineStats() {
      return this.canShowMenuItem('Enterprise.viewAnyArticleLineStats');
    },
  },
};
</script>

<style scoped></style>
