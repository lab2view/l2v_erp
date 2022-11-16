<template>
  <div v-if="canShowEnterpriseArticleLineStats" class="card">
    <div class="card">
      <div class="card-header">
        <a href="#" class="pull-left f-w-500" @click.prevent="refreshArticles">
          <span class="fa fa-refresh m-r-5" />
          {{ $t('common.refresh') }}
        </a>
      </div>
      <div class="card-body">
        <div class="tabbed-card">
          <ul
            class="pull-right nav nav-tabs border-tab nav-primary"
            role="tablist"
          >
            <li class="nav-item">
              <a
                class="nav-link active"
                data-bs-toggle="tab"
                href="#top-available-articles"
                role="tab"
                aria-controls="top-available-articles"
                aria-selected="true"
              >
                <i class="icofont icofont-shopping-cart"></i>
                {{ $t('common.headers.available_article') }}
              </a>
              <div class="material-border"></div>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-bs-toggle="tab"
                href="#top-stat-per-family"
                role="tab"
                aria-controls="top-stat-per-family"
                aria-selected="false"
              >
                <i class="icofont icofont-chart-bar-graph"></i>
                {{ $t('common.headers.family_stock') }}
              </a>
              <div class="material-border"></div>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-bs-toggle="tab"
                href="#top-stat-per-type"
                role="tab"
                aria-controls="top-stat-per-type"
                aria-selected="false"
              >
                <i class="icofont icofont-chart-flow-alt-1"></i>
                {{ $t('common.headers.type_stock') }}
              </a>
              <div class="material-border"></div>
            </li>
          </ul>
          <div class="tab-content">
            <div
              id="top-available-articles"
              class="tab-pane fade active show"
              role="tabpanel"
            >
              <BaseDatatable
                v-if="!$store.state.globalLoading"
                :tfoot="true"
                :total="articles.length"
              >
                <template #headers>
                  <th>#</th>
                  <th>{{ $t('common.attributes.article_id') }}</th>
                  <th>{{ $t('common.attributes.reference') }}</th>
                  <th class="text-center">
                    {{ $t('common.headers.stock_in') }}
                  </th>
                  <th class="text-end">
                    {{ $t('common.attributes.amount') }}
                  </th>
                </template>
                <ArticleStatsLineDetails
                  v-for="article in articles"
                  :key="`art-stat-lne-${article.id}`"
                  :article="article"
                />
                <template #footers>
                  <th colspan="3">TOTAL</th>
                  <th class="text-center">
                    {{ totalArticleStock }}
                  </th>
                  <th class="text-center">
                    {{ `${totalArticlePrice} ${currency}` }}
                  </th>
                </template>
              </BaseDatatable>
            </div>
            <div id="top-stat-per-family" class="tab-pane fade" role="tabpanel">
              <div class="user-status table-responsive">
                <table class="table table-bordernone">
                  <thead>
                    <tr>
                      <th scope="col">
                        {{ $t('products.productFamily.listTitle') }}
                      </th>
                      <th class="text-center" scope="col">
                        {{ $t('common.headers.stock_in') }}
                      </th>
                      <th class="text-center" scope="col">
                        {{ $t('common.attributes.amount') }}
                      </th>
                      <th class="text-end" scope="col">
                        {{ $t('common.attributes.state') }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(statFamily, index) in articleStatFamilies"
                      :key="`stat-fam-${index}`"
                    >
                      <td class="f-w-600">{{ statFamily.product_family }}</td>
                      <td class="text-center">{{ statFamily.total }}</td>
                      <td class="text-center">
                        {{ `${statFamily.total_price} ${currency}` }}
                      </td>
                      <td>
                        <BaseProgressBar
                          style-prop="height: 8px"
                          progress-class="progress-bar bg-primary"
                          :value="statFamily.total"
                          :max="totalArticleStock"
                          :show-percent="true"
                        />
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>{{ $t('common.headers.total') }}</th>
                      <th class="text-center">
                        {{ statFamilyTotal.quantity }}
                      </th>
                      <th class="text-center">
                        {{ `${statFamilyTotal.amount} ${currency}` }}
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div id="top-stat-per-type" class="tab-pane fade" role="tabpanel">
              <div class="user-status table-responsive">
                <table class="table table-bordernone">
                  <thead>
                    <tr>
                      <th scope="col">
                        {{ $t('products.productType.listTitle') }}
                      </th>
                      <th class="text-center" scope="col">
                        {{ $t('common.headers.stock_in') }}
                      </th>
                      <th class="text-center" scope="col">
                        {{ $t('common.attributes.amount') }}
                      </th>
                      <th class="text-end" scope="col">
                        {{ $t('common.attributes.state') }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(statType, index) in articleStatTypes"
                      :key="`stat-fam-${index}`"
                    >
                      <td class="f-w-600">{{ statType.product_type }}</td>
                      <td class="text-center">{{ statType.total }}</td>
                      <td class="text-center">
                        {{ `${statType.total_price} ${currency}` }}
                      </td>
                      <td>
                        <BaseProgressBar
                          style-prop="height: 8px"
                          progress-class="progress-bar bg-primary"
                          :value="statType.total"
                          :max="totalArticleStock"
                          :show-percent="true"
                        />
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>{{ $t('common.headers.total') }}</th>
                      <th class="text-center">{{ statTypeTotal.quantity }}</th>
                      <th class="text-center">
                        {{ `${statTypeTotal.amount} ${currency}` }}
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '/@/store/index';
import { mapGetters } from 'vuex';
import ArticleStatsLineDetails from '/@/components/dashboard/ArticleStatsLineDetails.vue';
import BaseProgressBar from '/@/components/common/BaseProgressBar.vue';
import { sumBy } from 'lodash';
import { getStockByEnterpriseId } from '/@/helpers/utils.js';
import { priceTypeCode } from '/@/helpers/codes.js';

export default {
  name: 'EnterpriseArticleStats',
  components: {
    BaseProgressBar,
    ArticleStatsLineDetails,
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
      'filterAvailableArticles',
      'getArticleTypeStatsByEnterpriseId',
      'getArticleFamilyStatsByEnterpriseId',
    ]),
    ...mapGetters('auth', ['canShowMenuItem']),
    enterpriseId() {
      return this.$route.params.enterprise_id
        ? parseInt('' + this.$route.params.enterprise_id)
        : null;
    },
    articles() {
      return this.filterAvailableArticles(this.enterpriseId).map((article) => {
        const stock = getStockByEnterpriseId(this.enterpriseId, article);
        const price = article.prices.find(
          (p) => p.price_type?.code === priceTypeCode.sell
        );
        return {
          ...article,
          stock_quantity: stock,
          price_value: parseFloat(
            price !== undefined ? (price.value * stock).toFixed() : 0
          ),
        };
      });
    },
    totalArticleStock() {
      return sumBy(this.articles, 'stock_quantity');
    },
    totalArticlePrice() {
      return sumBy(this.articles, 'price_value');
    },
    canShowEnterpriseArticleLineStats() {
      return this.canShowMenuItem('Enterprise.viewAnyArticleLineStats');
    },
    articleStatFamilies() {
      return this.getArticleFamilyStatsByEnterpriseId(this.enterpriseId);
    },
    articleStatTypes() {
      return this.getArticleTypeStatsByEnterpriseId(this.enterpriseId);
    },
    statFamilyTotal() {
      return {
        quantity: sumBy(this.articleStatFamilies, 'total'),
        amount: sumBy(this.articleStatFamilies, 'total_price'),
      };
    },
    statTypeTotal() {
      return {
        quantity: sumBy(this.articleStatTypes, 'total'),
        amount: sumBy(this.articleStatTypes, 'total_price'),
      };
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
