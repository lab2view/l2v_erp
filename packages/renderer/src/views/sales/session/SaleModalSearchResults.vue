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
              <div class="col-md-auto">
                <p class="pb-4">About 6,000 results (0.60 seconds)</p>
              </div>
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
    <template #footer>
      <BaseButton
        type="button"
        icon="fa fa-arrow-left"
        class="btn btn-secondary btn-sm m-r-5"
        :text="$t('common.close')"
        @click.prevent="$router.back()"
      />
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '/@/components/common/BaseModal.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import ArticleSearchResultLine from '/@/components/sales/session/ArticleSearchResultLine.vue';

export default {
  components: { ArticleSearchResultLine, BaseButton, BaseModal },
  data() {
    return {
      metaArticle: null,
      loading: true,
      searchField: {
        paginate: 5,
        keyword: null,
      },
    };
  },

  computed: {
    articles() {
      return this.metaArticle?.data;
    },
  },

  created() {
    if (this.$route.query.keyword) this.searchArticles(1);
  },

  methods: {
    searchArticles(page) {
      return this.$store
        .dispatch('article/searchArticles', {
          page,
          field: { ...this.searchField, keyword: this.$route.query.keyword },
        })
        .then(({ data }) => {
          this.metaArticle = data;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style scoped></style>
