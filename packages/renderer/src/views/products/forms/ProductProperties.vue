<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitPropertyForm">
      <div class="card-header pb-0">
        <h5>{{ $t('products.property.formCreateTitle') }}</h5>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <BaseSelect
                v-model="propertyForm.product_family_id"
                :label="$t('common.attributes.product_family')"
                :options="productFamilies"
                key-label="label"
                key-value="id"
                required
                :errors="errors?.product_family_id"
              />
            </div>
            <div class="col-md">
              <BaseSelect
                v-model="propertyForm.product_type_id"
                :label="$t('common.attributes.product_type')"
                :options="productTypes"
                key-label="label"
                key-value="id"
                required
                :errors="errors?.product_type_id"
              />
            </div>
          </div>
        </div>
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <BaseSelect
                v-model="propertyForm.type"
                :label="$t('common.attributes.type')"
                :options="propertyTypes"
                key-label="label"
                key-value="code"
                required
                :errors="errors?.type"
              />
            </div>
            <div class="col-md">
              <div class="row align-items-center">
                <div class="col-md">
                  <BaseInput
                    v-model="propertyForm.label"
                    :label="$t('common.attributes.label')"
                    placeholder="E.g. collections"
                    :errors="errors?.label"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-end">
          <BaseButton
            class="btn btn-primary col-auto"
            :text="$t('common.save')"
            icon="fa fa-save"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '../../../store';
import BaseSelect from '../../../components/common/BaseSelect.vue';
import BaseInput from '../../../components/common/BaseInput.vue';
import BaseButton from '../../../components/common/BaseButton.vue';

export default {
  components: { BaseButton, BaseInput, BaseSelect },
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
