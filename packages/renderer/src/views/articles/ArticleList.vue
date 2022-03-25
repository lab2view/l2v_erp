<template>
  <BaseContainer
    :title="$t('articles.title')"
    :module="$t('menu.modules.articles')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('articles.listTitle') }}</h5>
          </div>
        </div>
      </div>
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="articles.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.product_id') }}</th>
            <th>{{ $t('common.attributes.name') }}</th>
            <th class="text-center">{{ $t('common.headers.stock_in') }}</th>
            <th>{{ $t('common.attributes.reference') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="article in articles" :key="article.id">
            <td>{{ article.id }}</td>
            <td>{{ article.product.name }}</td>
            <td>{{ article.name }}</td>
            <td class="text-center"><ArticleStockIn :article="article" /></td>
            <td>
              {{ `${article.product.code} / ${article.product.reference}` }}
            </td>
            <td>
              <BaseButton
                type="button"
                class="btn btn-iconsolid btn-primary btn-sm"
                :title="$t('common.delete')"
                @click.prevent="
                  $router.push({
                    name: 'article.details',
                    params: { id: article.id },
                  })
                "
              >
                Consulter
              </BaseButton>
              <BaseButton
                v-if="!article.not_deletable"
                type="button"
                class="btn btn-iconsolid btn-danger btn-sm m-l-5"
                :title="$t('common.delete')"
                @click.prevent="deleteArticle(article)"
              >
                <i class="fa fa-trash-o" />
              </BaseButton>
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
import store from '../../store';
import { mapGetters } from 'vuex';
import BaseContainer from '../../components/common/BaseContainer.vue';
import BaseButton from '../../components/common/BaseButton.vue';
import ArticleStockIn from '/@/components/articles/ArticleStockIn.vue';

export default {
  components: { ArticleStockIn, BaseButton, BaseContainer, BaseDatatable },
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
  },
  created() {
    this.$store.commit('article/SET_CURRENT_ARTICLE', null);
  },

  methods: {
    deleteArticle(article) {
      if (confirm(this.$t('messages.confirmDelete', { label: article.name })))
        this.$store.dispatch('article/deleteArticle', article.id);
    },
  },
};
</script>

<style scoped></style>
