<template>
  <BaseContainer
    :title="$t('article.title')"
    :module="$t('menu.module.articles')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('article.listTitle') }}</h5>
          </div>
          <!--          <div class="col-sm-auto align-items-end">-->
          <!--            <router-link-->
          <!--              :to="{ name: 'article.form' }"-->
          <!--              href="#"-->
          <!--              class="btn btn-primary"-->
          <!--              type="button"-->
          <!--            >-->
          <!--              <i class="fa fa-plus m-r-5" />-->
          <!--              {{ $t('common.add') }}-->
          <!--            </router-link>-->
          <!--          </div>-->
        </div>
      </div>
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="articles.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.product') }}</th>
            <th>{{ $t('common.attributes.name') }}</th>
            <th>{{ $t('common.attributes.barcode') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="article in articles" :key="article.id">
            <td>{{ article.id }}</td>
            <td>{{ article.product.name }}</td>
            <td>{{ article.name }}</td>
            <td>
              {{ `${article.product.code} / ${article.product.reference}` }}
            </td>
            <td>
              <button
                class="btn btn-secondary btn-xs"
                type="button"
                data-original-title="btn btn-secondary btn-xs"
                :title="$t('common.update')"
                @click.prevent="
                  $router.push({
                    name: 'article.form',
                    params: { id: article.id },
                  })
                "
              >
                {{ $t('common.update') }}
              </button>
              <button
                v-if="!article.not_deletable"
                class="btn btn-danger btn-xs m-l-5"
                type="button"
                data-original-title="btn btn-danger btn-xs"
                :title="$t('common.delete')"
                @click.prevent="deleteArticle(article)"
              >
                <i class="fa fa-trash-o" />
              </button>
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

export default {
  components: { BaseContainer, BaseDatatable },
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
