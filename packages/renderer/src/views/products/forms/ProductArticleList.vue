<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <router-view />
    </div>
  </div>
  <div class="card mb-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>{{ `${$t('article.listTitle')} - ${product.reference}` }}</h5>
        </div>
        <div
          v-if="$route.name === 'product.form.article'"
          class="col-sm-auto align-items-end"
        >
          <router-link
            :to="{ name: 'product.form.article.form' }"
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
      <div class="user-status table-responsive">
        <table class="table table-bordernone">
          <thead>
            <tr>
              <th scope="col">{{ $t('common.attributes.package_id') }}</th>
              <th scope="col">{{ $t('common.attributes.quantity') }}</th>
              <th scope="col">{{ $t('common.attributes.description') }}</th>
              <th scope="col">{{ $t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <ProductArticleLine
              v-for="(article, index) in articles"
              :key="index"
              :article="article"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '../../../store';
import ProductArticleLine from '../../../components/products/ProductArticleLine.vue';

export default {
  components: { ProductArticleLine },
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
    ...mapGetters('product', ['product']),
    ...mapGetters('article', ['getArticleByProductId']),
    articles() {
      return this.getArticleByProductId(this.product.id);
    },
  },
};
</script>

<style scoped></style>
