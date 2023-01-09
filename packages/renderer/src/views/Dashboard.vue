<template>
  <BaseContainer :title="dashboardTitle">
    <div v-if="canShowEnterpriseArticleStats" class="row">
      <div v-if="$route.name === 'dashboard'" class="col-sm-12">
        <div class="card">
          <BaseTableHeader
            :title="$t('common.headers.available_stock_per_enterprise')"
            :refresh-action-field="{ next: true }"
            refresh-action-name="enterprise/getEnterpriseArticleStats"
          />
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">
                      {{ $t('common.headers.enterprise_id') }}
                    </th>
                    <th scope="col">
                      {{ $t('common.attributes.article_id') }}
                    </th>
                    <th
                      v-if="canShowEnterpriseArticleLineStats"
                      class="text-end"
                      scope="col"
                    >
                      {{ $t('common.actions') }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <EnterpriseArticleStatsLine
                    v-for="(distribution, index) in distributions"
                    :key="`ent-distribution-${index}`"
                    :distribution="distribution"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="$route.name === 'dashboard.enterprise.article.stats'"
        class="col-sm-12"
      >
        <router-view />
      </div>
    </div>
  </BaseContainer>
</template>

<script>
import { defineComponent } from 'vue';
import BaseContainer from '/@/components/common/BaseContainer.vue';
import store from '/@/store/index.js';
import EnterpriseArticleStatsLine from '/@/components/dashboard/EnterpriseArticleStatsLine.vue';
import { mapGetters } from 'vuex';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import { privilegeCode } from '/@/helpers/codes';

export default defineComponent({
  name: 'Dashboard',
  components: { BaseTableHeader, EnterpriseArticleStatsLine, BaseContainer },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('article/getArticlesList', {
        page: 1,
        field: {},
      }),
      store.dispatch('enterprise/getEnterpriseArticleStats'),
    ])
      .then(() => {
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  computed: {
    ...mapGetters('enterprise', ['distributions', 'getEnterpriseById']),
    ...mapGetters('auth', ['canShowMenuItem']),
    canShowEnterpriseArticleStats() {
      return this.canShowMenuItem(privilegeCode.enterpriseArticleStat);
    },
    canShowEnterpriseArticleLineStats() {
      return this.canShowMenuItem(privilegeCode.enterpriseArticleLineStat);
    },
    dashboardTitle() {
      if (this.$route.name === 'dashboard.enterprise.article.stats') {
        const enterprise = this.getEnterpriseById(
          parseInt('' + this.$route.params.enterprise_id)
        );
        return `${this.$t('menu.dashboard.title')} : ${this.$t(
          'menu.dashboard.article_enterprise_state',
          { enterprise: enterprise?.name ?? 'Principal' }
        )}`;
      } else return this.$t('menu.dashboard.title');
    },
  },
});
</script>

<style scoped></style>
