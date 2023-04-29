<template>
  <div v-if="canShowEnterpriseArticleLineStats" class="card">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col">
            <a
              href="#"
              class="pull-left f-w-500"
              @click.prevent="refreshArticles"
            >
              <span class="fa fa-refresh m-r-5" />
              {{ $t('common.refresh') }}
            </a>
          </div>
          <div class="col-auto">
            <BaseRadioButtonGroup
              v-model="stockLevel"
              :options="filterStockFor"
              key-label="label"
              key-value="value"
              name="filter_stock_for"
            />
          </div>
        </div>
      </div>
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :buttons="datatableButtons"
          :total="articles.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.article_id') }}</th>
            <th class="text-center">
              {{ $t('common.headers.stock_in') }}
            </th>
            <th class="text-end">
              {{ $t('common.attributes.amount') }}
            </th>
          </template>
          <tr v-for="article in articles" :key="`art-level-lne-${article.id}`">
            <td>{{ article.id }}</td>
            <td>{{ article.name }}</td>
            <td class="text-center">
              {{ article.stock_quantity }}
            </td>
            <td class="text-end">{{ `${article.buy_price} ${currency}` }}</td>
          </tr>
        </BaseDatatable>
      </div>
    </div>
  </div>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '/@/store/index';
import { mapGetters } from 'vuex';
import { datatableBtnCode } from '/@/helpers/codes';
import BaseRadioButtonGroup from '/@/components/common/BaseRadioButtonGroup.vue';

export default {
  name: 'EnterpriseArticleStockLevels',
  components: {
    BaseRadioButtonGroup,
    BaseDatatable,
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
    ...mapGetters('workspace', ['currency']),
    ...mapGetters('article', [
      'filterArticleByDistributionStockLevel',
      'getFilterStockLevel',
    ]),
    ...mapGetters('auth', ['canShowMenuItem']),
    stockLevel: {
      get() {
        return this.getFilterStockLevel;
      },
      set(value) {
        this.$store.commit('SET_GLOBAL_LOADING', true);
        setTimeout(() => {
          this.$store.commit('article/SET_FILTER_STOCK_LEVEL', value);
          this.$store.commit('SET_GLOBAL_LOADING', false);
        }, 2000);
      },
    },
    filterStockFor() {
      return [
        {
          value: 'critical',
          label: `Stock ${this.$t('common.attributes.critical')}`,
        },
        {
          value: 'alert',
          label: `Stock ${this.$t('common.attributes.alert')}`,
        },
        {
          value: 'min',
          label: `Stock ${this.$t('common.attributes.min')}`,
        },
      ];
    },
    datatableButtons() {
      return [datatableBtnCode.excel, datatableBtnCode.csv];
    },
    enterpriseId() {
      return this.$route.params.enterprise_id
        ? parseInt('' + this.$route.params.enterprise_id)
        : null;
    },
    articles() {
      return this.filterArticleByDistributionStockLevel(this.enterpriseId);
    },
    canShowEnterpriseArticleLineStats() {
      return this.canShowMenuItem('Enterprise.viewAnyArticleLineStats');
    },
  },
  methods: {
    refreshArticles() {
      this.$store.commit('SET_GLOBAL_LOADING', true);
      this.$store
        .dispatch('article/getArticlesList', {
          page: 1,
          field: { paginate: 50, next: true },
        })
        .finally(() => this.$store.commit('SET_GLOBAL_LOADING', false));
    },
  },
};
</script>

<style scoped></style>
