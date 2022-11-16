<template>
  <BaseContainer
    :title="$t('articles.title')"
    :module="$t('menu.modules.articles')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('articles.listTitle')"
        :refresh-action-field="{ page: 1, field: { paginate: 50, next: true } }"
        refresh-action-name="article/getArticlesList"
        add-action-router-name="article.setPrice"
        add-action-label="common.btn_set_global_price"
        add-action-icon="fa fa-check-circle-o"
      />
      <div class="card-body p-1">
        <div class="row mb-2">
          <div class="col-md-3">
            <BaseFieldGroup
              :with-refresh="true"
              refresh-action-name="product_family/getProductFamiliesList"
              :with-append="false"
            >
              <BaseSelect
                v-model.number="articleFilter.product_family_id"
                :options="productFamilies"
                key-label="label"
                key-value="id"
              />
            </BaseFieldGroup>
          </div>
          <div class="col-md-3">
            <BaseFieldGroup
              :with-refresh="true"
              refresh-action-name="product_type/getProductTypesList"
              :with-append="false"
            >
              <BaseSelect
                v-model.number="articleFilter.product_type_id"
                :options="filterProductTypes"
                key-label="label"
                key-value="id"
              />
            </BaseFieldGroup>
          </div>
          <div class="col-md-3">
            <BaseFieldGroup
              :with-refresh="true"
              refresh-action-name="product_unit/getProductUnitsList"
              :with-append="false"
            >
              <BaseSelect
                v-model.number="articleFilter.product_unit_id"
                :options="productUnits"
                key-label="label"
                key-value="id"
              />
            </BaseFieldGroup>
          </div>
          <div class="col-md-3">
            <BaseSwitchInput
              v-model="articleFilter.sell_price_not_set"
              :label="$t('articles.price.form.not_set_price')"
            />
          </div>
        </div>

        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="articles.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.product_id') }}</th>
            <th>{{ $t('common.attributes.name') }}</th>
            <th class="text-center">{{ $t('common.headers.stock_in') }}</th>
            <th>{{ $t('common.attributes.reference') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>

          <ArticleTableLine
            v-for="article in articles"
            :key="`article-${article.id}`"
            :article="article"
          />
        </BaseDatatable>
      </div>

      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';
import BaseContainer from '/@/components/common/BaseContainer.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import ArticleTableLine from '/@/components/articles/ArticleTableLine.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseSwitchInput from '/@/components/common/BaseSwitchInput.vue';

export default {
  name: 'ArticleList',
  components: {
    BaseSwitchInput,
    BaseSelect,
    BaseFieldGroup,
    ArticleTableLine,
    BaseTableHeader,
    BaseButton,
    BaseContainer,
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
  data() {
    return {
      articleFilter: {
        product_family_id: null,
        product_type_id: null,
        product_unit_id: null,
        sell_price_not_set: false,
      },
    };
  },
  watch: {
    articles() {
      if (!this.$store.state.globalLoading) {
        this.$store.dispatch('setGlobalLoading', true);
        setTimeout(() => this.$store.dispatch('setGlobalLoading', false), 2000);
      }
    },
  },
  computed: {
    ...mapGetters('article', ['getArticlesByFilter']),
    ...mapGetters('product_family', ['productFamilies']),
    ...mapGetters('product_type', ['productTypes']),
    ...mapGetters('product_unit', ['productUnits']),
    articles() {
      return this.getArticlesByFilter(this.articleFilter);
    },
    filterProductTypes() {
      return this.productTypes.filter((pt) =>
        this.articleFilter?.product_family_id
          ? pt.product_family_id === this.articleFilter?.product_family_id
          : true
      );
    },
  },
  created() {
    this.$store.commit('article/SET_CURRENT_ARTICLE', null);
  },
};
</script>

<style scoped></style>
