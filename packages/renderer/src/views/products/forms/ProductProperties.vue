<template>
  <div class="row justify-content-center mt-2">
    <div class="col-md-10">
      <router-view :product="product" />
    </div>
  </div>
  <div class="card mb-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>
            {{ `${$t('products.tax.listTitle')} - ${product.reference}` }}
          </h5>
        </div>
        <div
          v-if="$route.name === 'product.form.setting.tax'"
          class="col-sm-auto align-items-end"
        >
          <router-link
            :to="{
              name: 'product.form.setting.tax.form',
              params: {
                ...$route.params,
              },
            }"
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
              <th scope="col">{{ $t('common.attributes.tax_id') }}</th>
              <th scope="col">{{ $t('common.attributes.value') }}</th>
              <th scope="col" class="text-center">
                {{ $t('common.actions') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <ProductTaxLine
              v-for="(tax, index) in product_taxes"
              :key="index"
              :product-tax="tax"
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

export default {
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('property/getPropertiesList', {
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
      errors: [],
      propertyForm: {
        id: null,
        product_type_id: null,
        product_family_id: null,
        label: null,
        code: null,
      },
    };
  },
  computed: {
    ...mapGetters('property', ['property']),
    ...mapGetters('product_family', ['productFamilies']),
    ...mapGetters('product_type', ['productTypes']),

    title() {
      return this.property
        ? this.$t('products.property.formUpdateTitle')
        : this.$t('products.property.formCreateTitle');
    },
    propertyTypes() {
      return [
        { code: 'text', label: this.$t('common.fields.text') },
        { code: 'number', label: this.$t('common.fields.number') },
        { code: 'date', label: this.$t('common.fields.date') },
        { code: 'time', label: this.$t('common.fields.time') },
        { code: 'datetime', label: this.$t('common.fields.datetime') },
        { code: 'url', label: this.$t('common.fields.url') },
        { code: 'radio', label: this.$t('common.fields.radio') },
      ];
    },
  },
  created() {
    if (this.property) this.propertyForm = this.property;
  },
  beforeUnmount() {
    if (this.property)
      this.$store.commit('property/SET_CURRENT_PROPERTY', null);
  },
  methods: {
    submitPropertyForm() {
      if (this.property)
        this.$store
          .dispatch('property/updateProperty', this.propertyForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch('property/addProperty', this.propertyForm)
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
