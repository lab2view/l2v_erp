<template>
  <BaseContainer
    :title="$t('articles.title')"
    :module="$t('menu.modules.articles')"
  >
    <div class="card">
      <div class="card-body p-1">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="mostSaleArticles.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.name') }}</th>
            <th>{{ $t('common.headers.stock_in') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="(article, index) in mostSaleArticles" :key="article.id">
            <td>{{ index + 1 }}</td>
            <td>{{ article.name }}</td>
            <td class="text-center">
              <div
                class="span badge rounded-pill"
                :class="`pill-badge-${stockClassState(article)}`"
              >
                {{ article.stock }}
              </div>
            </td>
            <td>
              <BaseActionBtnGroup
                entity="Article"
                :with-update-btn="false"
                :with-delete-btn="false"
                @show="
                  $router.push({
                    name: 'article.details',
                    params: { id: article.id },
                  })
                "
              >
              </BaseActionBtnGroup>
            </td>
          </tr>
        </BaseDatatable>
      </div>

      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '/@/store';
import BaseContainer from '/@/components/common/BaseContainer.vue';
import { mapGetters } from 'vuex';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';

export default {
  name: 'MostSalesList',
  components: {
    BaseActionBtnGroup,
    BaseContainer,
    BaseDatatable,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('article/getMostSaleArticlesList', {
        page: 1,
        field: {
          most_sale_limit: 10,
        },
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
    ...mapGetters('article', ['mostSaleArticles']),
  },
  methods: {
    stockClassState(article) {
      if (article.stock > 0) return 'success';
      else return 'danger';
    },
  },
};
</script>

<style scoped></style>
