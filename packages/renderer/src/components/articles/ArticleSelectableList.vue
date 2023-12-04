<template>
  <div class="card rounded shadow-sm">
    <slot>
      <div class="card-header text-center p-3">
        <h5>{{ $t('articles.selection') }}</h5>
      </div>
    </slot>
    <form class="theme-form" @submit.prevent="submitSelectedForm">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="default-according style-1 faq-accordion job-accordion">
            <div class="card mb-0">
              <div class="card-header">
                <h5 class="mb-0 p-0">{{ $t('common.filter') }}</h5>
              </div>
              <div class="card-body filter-cards-view animate-chk">
                <div class="job-filter mb-3">
                  <div class="faq-form">
                    <input
                      v-model="articleFilter.keyword"
                      class="form-control"
                      type="text"
                      :placeholder="$t('common.attributes.search')"
                    /><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-search search-icon"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                </div>
                <div class="job-filter">
                  <div class="mb-3">
                    <BaseSelect
                      v-model.number="articleFilter.product_family_id"
                      :label="$t('common.fields.product_family_filter')"
                      :options="productFamilies"
                      key-label="label"
                      key-value="id"
                    />
                  </div>
                </div>
                <div class="job-filter">
                  <div class="mb-3">
                    <BaseSelect
                      v-model.number="articleFilter.product_type_id"
                      :label="$t('common.fields.product_type_filter')"
                      :options="selectableProductTypes"
                      key-label="label"
                      key-value="id"
                    />
                  </div>
                </div>
                <div class="job-filter">
                  <div class="mb-3">
                    <BaseSelect
                      v-model.number="articleFilter.product_id"
                      :label="$t('common.fields.product_filter')"
                      :options="selectableProducts"
                      key-label="name"
                      key-value="id"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="card-body p-0">
            <div class="table-responsive">
              <div class="vertical-scroll scroll-demo">
                <table class="table">
                  <thead>
                    <tr>
                      <th>{{ $t('articles.listTitle') }}</th>
                      <th :title="$t('common.select_all')" class="text-end">
                        <div
                          class="checkbox"
                          :class="
                            partialSelect
                              ? 'checkbox-solid-success'
                              : 'checkbox-primary'
                          "
                        >
                          <input
                            id="checkbox-primary-1"
                            v-model="selectAll"
                            type="checkbox"
                          />
                          <label
                            class="m-0 pt-0 pb-0 p-l-5"
                            for="checkbox-primary-1"
                            >{{ $t('common.select_all') }}</label
                          >
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="article in selectableArticles" :key="article.id">
                      <ArticleSelectableColumn
                        :article="article"
                        :selected-list="selected"
                        @selected="selectArticle(article, true)"
                        @unselected="selectArticle(article, false)"
                      />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer pt-2 pb-2">
        <div class="row justify-content-center align-items-center">
          <BaseButton
            v-if="canCancel"
            type="button"
            class="btn btn-secondary col-auto m-r-5"
            :text="$t('common.close')"
            @click.prevent="$router.back()"
          />
          <BaseButton
            class="btn btn-primary col-auto"
            :text="$t(`${confirmBtnLabel}`)"
            icon="fa fa-save"
            :disabled="!isSelected"
            :loading="loading"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import store from '/@/store';
import ArticleSelectableColumn from '/@/components/articles/groups/ArticleSelectableColumn.vue';

export default {
  name: 'ArticleSelectableList',
  components: { ArticleSelectableColumn, BaseButton, BaseSelect },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('product_family/getProductFamiliesList', {
        page: 1,
        field: {},
      }),
      store.dispatch('product_type/getProductTypesList', {
        page: 1,
        field: {},
      }),
      store.dispatch('product/getProductsList', {
        page: 1,
        field: {},
      }),
      store.dispatch('article/getArticlesList', {
        page: 1,
        field: {},
      }),
    ])
      .catch((error) => console.log(error))
      .finally(() => next());
  },
  props: {
    usedArticles: {
      type: Array,
      required: true,
    },
    submitStoreAction: {
      type: Function,
      required: true,
    },
    canCancel: {
      type: Boolean,
      default: true,
    },
    confirmBtnLabel: {
      type: String,
      default: 'common.save',
    },
    forExit: {
      type: Boolean,
      default: false,
    },
    distributionId: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      product_family_id: null,
      articleFilter: {
        keyword: null,
        product_type_id: null,
        product_id: null,
      },
      selected: [],
    };
  },
  computed: {
    ...mapGetters('article', ['searchArticleByCriteria']),
    ...mapGetters('product_family', ['productFamilies']),
    ...mapGetters('product_type', ['productTypes']),
    ...mapGetters('product', ['products']),
    selectableProductTypes() {
      const types = this.articleFilter.product_family_id
        ? this.productTypes.filter(
            (pt) =>
              pt.product_family_id === this.articleFilter.product_family_id
          )
        : this.productTypes;

      return [{ label: this.$t('common.all'), id: '' }, ...types];
    },
    selectableProducts() {
      return [{ name: this.$t('common.all'), id: '' }];
    },
    selectableArticles() {
      return this.searchArticleByCriteria({
        ...this.articleFilter,
        distribution_id: this.distributionId,
        haveStock: this.forExit,
      }).filter(
        (art) =>
          this.usedArticles.find((ua) => ua.article_id === art.id) === undefined
      );
    },
    isSelected() {
      return this.selected.length > 0;
    },
    partialSelect() {
      return (
        this.isSelected && this.selected.length < this.selectableArticles.length
      );
    },
    selectedAllArticle() {
      if (this.selectableArticles.length)
        return this.selected.length === this.selectableArticles.length;
      else return false;
    },
    selectAll: {
      get() {
        return this.selectedAllArticle;
      },
      set(value) {
        if (!value) this.selected = [];
        else {
          let result = [];
          this.selectableArticles.forEach((sa) => result.push({ id: sa.id }));
          this.selected = result;
        }
      },
    },
  },
  watch: {
    selectableArticles() {
      this.selected = [];
    },
  },
  methods: {
    submitSelectedForm() {
      if (this.loading) return;

      if (this.selected.length > 0) {
        this.loading = true;
        this.submitStoreAction(this.selected)
          .then(() => {
            this.loading = false;
          })
          .catch((err) => console.log(err));
      }
    },

    selectArticle(article, adding) {
      if (adding) this.selected.push({ id: article.id });
      else this.selected = this.selected.filter((s) => s.id !== article.id);
    },
  },
};
</script>

<style scoped></style>
