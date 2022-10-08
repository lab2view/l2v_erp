<template>
  <BaseModal
    :title="`${$t('common.headers.search_result')} '' ${
      $route.query.keyword
    } ''`"
    modal-size="lg"
  >
    <div class="search-page mb-0">
      <div class="card-body p-0">
        <div id="top-tabContent" class="tab-content">
          <div
            id="all-links"
            class="search-links tab-pane fade active show"
            role="tabpanel"
            aria-labelledby="all-link"
          >
            <div class="row">
              <div v-if="metaArticle" class="col-12">
                <p class="pb-4">
                  {{ $t('common.result_count', { count: metaArticle.total }) }}
                </p>
              </div>
              <div class="vertical-scroll scroll-demo m-0">
                <ArticleSearchResultLine
                  v-for="article in articles"
                  :key="`search-${article.id}`"
                  :article="article"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <BasePaginate
        v-if="metaArticle"
        :links="metaArticle.links"
        @change="searchArticles"
      />
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '/@/components/common/BaseModal.vue';
import ArticleSearchResultLine from '/@/components/sales/session/ArticleSearchResultLine.vue';
import BasePaginate from '/@/components/common/BasePaginate.vue';

export default {
  name: 'SaleModalSearchResults',
  components: { BasePaginate, ArticleSearchResultLine, BaseModal },
  data() {
    return {
      metaArticle: null,
      loading: true,
      searchField: {
        paginate: 10,
        keyword: null,
      },
    };
  },

  computed: {
    articles() {
      return this.metaArticle?.data;
    },
  },

  beforeCreate() {
    this.$store.dispatch('setGlobalLoading', true);
  },

  created() {
    if (this.$route.query.keyword) this.searchArticles(1);
  },

  methods: {
    searchArticles(page) {
      this.$store.dispatch('setGlobalLoading', true);
      return this.$store
        .dispatch('article/searchArticles', {
          page,
          field: { ...this.searchField, keyword: this.$route.query.keyword },
        })
        .then(({ data }) => {
          this.metaArticle = data;
          this.$store.dispatch('setGlobalLoading', false);
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style scoped></style>
