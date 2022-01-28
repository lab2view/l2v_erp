<template>
  <div class="card mb-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-md">
          <h5>{{ `${$t('article.listTitle')} - ${product.reference}` }}</h5>
        </div>
        <div class="col-md-auto">
          <ul id="right-tab" class="nav nav-tabs nav-right" role="tablist">
            <li class="nav-item">
              <router-link
                class="nav-link"
                active-class="active"
                :to="{ name: 'product.form.stock.entry' }"
              >
                <i class="icofont icofont-ui-home"></i>
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'product.form.stock.exit' }"
              >
                <i class="icofont icofont-ui-home"></i>
                Exit
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card-body">
      <div class="tab-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProductStockLayout',
  computed: {
    ...mapGetters('product', ['product']),
  },
};
</script>

<style scoped></style>
