<template>
  <BaseContainer title="Tableau de bord">
    <div class="row">
      <div v-if="$route.name === 'dashboard'" class="col-sm-12">
        <div class="card">
          <BaseTableHeader
            title="Stock d'articles par entreprise"
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
                    <th scope="col">{{ $t('common.attributes.state') }}</th>
                    <th class="text-end" scope="col">
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
    ...mapGetters('enterprise', ['distributions']),
    bookmarkItems() {
      return [
        {
          to: '',
          title: 'Notifications',
          feather: 'inbox',
        },
      ];
    },
  },
});
</script>

<style scoped></style>
