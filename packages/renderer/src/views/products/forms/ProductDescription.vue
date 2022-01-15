<template>
  <div class="card mb-0">
    <form class="theme-form">
      <div class="card-header pb-0">
        <h5>{{ formTitle }}</h5>
        <span
          >Using the <a href="#">card</a> component, you can extend the default
          collapse behavior to create an accordion.</span
        >
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label class="col-form-label pt-0" for="exampleInputEmail1"
            >Email address</label
          >
          <input
            id="exampleInputEmail1"
            class="form-control"
            type="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          /><small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="mb-3">
          <label class="col-form-label pt-0" for="exampleInputPassword1"
            >Password</label
          >
          <input
            id="exampleInputPassword1"
            class="form-control"
            type="password"
            placeholder="Password"
          />
        </div>
        <div class="checkbox p-0">
          <input id="dafault-checkbox" type="checkbox" />
          <label class="mb-0" for="dafault-checkbox"
            >Remember my preference</label
          >
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-end">
          <button
            type="button"
            class="btn btn-secondary col-auto m-r-5"
            @click.prevent="$router.push({ name: 'products' })"
          >
            {{ $t('common.cancel') }}
          </button>
          <button type="submit" class="btn btn-primary col-auto">
            {{ $t('common.save') }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '../../../store';

export default {
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('productFamilyConfig/getProductFamiliesList', {
        page: 1,
        field: {},
      }),
      store.dispatch('productTypeConfig/getProductTypesList', {
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
      errors: [],
      productForm: {
        product_unit_id: null,
        product_type_id: null,
        name: null,
        reference: null,
        code: null,
        description: null,
        image: null,
        weight: null,
        price: null,
        disabled_at: null,
        can_be_sell: null,
        min_stock: null,
        max_stock: null,
        critical_stock: null,
        alert_stock: null,
      },
    };
  },
  computed: {
    ...mapGetters('product', ['product']),
    ...mapGetters('productUnitConfig', ['productUnits']),
    ...mapGetters('productTypeConfig', ['productTypes']),
    formTitle() {
      return this.product
        ? this.$t('product.form.updateTitle')
        : this.$t('product.form.createTitle');
    },
  },
  created() {
    if (this.product) this.productForm = this.product;
  },
  methods: {
    submitProductForm() {
      if (this.product)
        this.$store
          .dispatch('product/updateProduct', this.productForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch('product/addProduct', this.productForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
    },
  },
};
</script>

<style scoped></style>
