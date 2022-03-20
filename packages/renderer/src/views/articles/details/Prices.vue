<template>
  <div class="card mb-0 border-top-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>{{ `${$t('articles.detail.price.title')} : ${article.name}` }}</h5>
        </div>
        <div class="col-sm-auto align-items-end">
          <router-link
            :to="{ name: 'article.prices.from' }"
            class="btn btn-primary"
            type="button"
          >
            <i class="fa fa-plus m-r-5" />
            {{ $t('common.add') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">{{ $t('common.attributes.price_type_id') }}</th>
              <th scope="col">{{ $t('common.attributes.amount') }}</th>
            </tr>
          </thead>
          <tbody>
            <ArticlePriceTableLine
              v-for="(priceType, index) in priceTypes"
              :key="`price-type-${index}`"
              :price-type="priceType"
              :article="article"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <router-view />
</template>

<script>
import ArticleMixin from '/@/mixins/ArticleMixin';
import store from '/@/store/index.js';
import { mapGetters } from 'vuex';
import ArticlePriceTableLine from '/@/components/articles/ArticlePriceTableLine.vue';

export default {
  components: { ArticlePriceTableLine },
  mixins: [ArticleMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('price_type/getPriceTypeList', {
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
    ...mapGetters('price_type', ['priceTypes']),
  },
};
</script>

<style scoped></style>
