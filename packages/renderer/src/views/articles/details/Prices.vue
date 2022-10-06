<template>
  <div class="card mb-0 border-top-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>
            {{ `${$t('articles.detail.price.title')} : ${article.name}` }}
          </h5>
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
      <div class="row justify-content-end" v-if="isRoleAdmin">
        <div class="col-md-6">
          <div class="row align-items-center">
            <div class="col text-end f-w-700 border-bottom pb-1">
              {{ $t('common.fields.select_enterprise_for_custom_price') }}
            </div>
            <div class="col-auto">
              <BaseSelect
                v-model.number="enterprise_id"
                :options="selectableEnterprise"
                key-label="name"
                key-value="id"
                class="form-control-sm shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">{{ $t('common.attributes.price_type_id') }}</th>
              <th scope="col">{{ $t('common.attributes.state') }}</th>
              <th scope="col">{{ $t('common.attributes.amount') }}</th>
            </tr>
          </thead>
          <tbody>
            <ArticlePriceTableLine
              v-for="(priceType, index) in priceTypes"
              :key="`price-type-${index}`"
              :price-type="priceType"
              :article="article"
              :enterprise-id="enterprise_id"
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
import BaseSelect from '/@/components/common/BaseSelect.vue';

export default {
  name: 'Prices',
  components: { BaseSelect, ArticlePriceTableLine },
  mixins: [ArticleMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('price_type/getPriceTypeList', {
        page: 1,
        field: {},
      }),
      store.dispatch('enterprise/getEnterprisesList', {
        page: 1,
        field: {},
      }),
    ])
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
      enterprise_id: null,
    };
  },
  computed: {
    ...mapGetters('price_type', ['priceTypes']),
    ...mapGetters('enterprise', ['enterprises']),
    ...mapGetters('auth', ['isRoleAdmin']),
    selectableEnterprise() {
      return [{ id: '', name: this.$t('common.parent') }, ...this.enterprises];
    },
  },
};
</script>

<style scoped></style>
