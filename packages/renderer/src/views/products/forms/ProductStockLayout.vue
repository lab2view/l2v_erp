<template>
  <div class="card mb-0">
    <div class="card-body">
      <ArticleStockTable :articles="articles" />
    </div>
    <div class="card-header">
      <div class="row align-items-center">
        <div class="col-md">
          <h5>{{ `${$t('stocks.movement')} - ${product.reference}` }}</h5>
        </div>
        <div class="col-md-auto">
          <ul
            id="right-tab"
            class="nav nav-pills nav-success nav-right"
            role="tablist"
          >
            <li class="nav-item shadow-sm">
              <router-link
                class="nav-link"
                :class="
                  $route.name === 'products.form.stocks.entry' ? 'active' : ''
                "
                :to="{ name: 'products.form.stocks.entry' }"
              >
                <i class="fa fa-long-arrow-up"></i>
                {{ $t('menu.movement.entry') }}
              </router-link>
            </li>
            <li class="nav-item shadow-sm">
              <router-link
                class="nav-link"
                :class="
                  $route.name === 'products.form.stocks.exit' ? 'active' : ''
                "
                :to="{ name: 'products.form.stocks.exit' }"
              >
                <i class="fa fa-long-arrow-down"></i>
                {{ $t('menu.movement.exit') }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ArticleStockTable from '../../../components/articles/ArticleStockTable.vue';

export default {
  name: 'ProductStockLayout',
  components: { ArticleStockTable },
  computed: {
    ...mapGetters('product', ['product']),
    ...mapGetters('article', ['getArticleByProductId']),
    articles() {
      return this.getArticleByProductId(this.product.id);
    },
  },
};
</script>

<style scoped></style>
