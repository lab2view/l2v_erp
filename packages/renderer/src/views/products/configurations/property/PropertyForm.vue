<template>
  <BaseFormModal :title="title" :submit-form="submitPropertyForm">
    <div class="mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="propertyForm.label"
        class="form-control"
        type="text"
        placeholder="Cassable..."
        required
      />
      <div v-if="errors.label" class="invalid-feedback" style="display: inline">
        {{ errors.label[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold" for="type">{{
        $t('common.attributes.type')
      }}</label>
      <input
        id="type"
        v-model="propertyForm.type"
        class="form-control"
        type="text"
        placeholder="Type..."
      />
      <div v-if="errors.type" class="invalid-feedback" style="display: inline">
        {{ errors.type[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold" for="product_id">{{
          $t('common.attributes.product')
        }}</label>
      <select
        id="product_id"
        v-model="propertyForm.product_id"
        class="form-control"
      >
        <option value="0" disabled selected>{{ $t('common.choose')}}</option>
        <option v-for="(product, index) in products" :key="index" :value="product.id" >{{ product.label }}</option>
      </select>
      <div v-if="errors.product_id" class="invalid-feedback" style="display: inline">
        {{ errors.product_id[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold" for="product_type_id">{{
          $t('common.attributes.product_type')
        }}</label>
      <select
        id="product_type_id"
        v-model="propertyForm.product_type_id"
        class="form-control"
      >
        <option value="0" disabled selected>{{ $t('common.choose')}}</option>
        <option v-for="(product_type, index) in product_types" :key="index" :value="product_type.id" >{{ product_type.label }}</option>
      </select>
      <div v-if="errors.product_type_id" class="invalid-feedback" style="display: inline">
        {{ errors.product_type_id[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold" for="product_family_id">{{
          $t('common.attributes.product_family')
        }}</label>
      <select
        id="product_family_id"
        v-model="propertyForm.product_family_id"
        class="form-control"
      >
        <option value="0" disabled selected>{{ $t('common.choose')}}</option>
        <option v-for="(product_family, index) in product_familys" :key="index" :value="product_family.id" >{{ product_family.label }}</option>
      </select>
      <div v-if="errors.product_family_id" class="invalid-feedback" style="display: inline">
        {{ errors.product_family_id[0] }}
      </div>
    </div>

    <template #footer>
      <button class="btn btn-primary" type="submit" :title="$t('common.save')">
        {{ $t('common.save') }}
      </button>
    </template>
  </BaseFormModal>
</template>

<script>
import BaseFormModal from '../../../../components/common/BaseFormModal.vue';
import { mapGetters } from 'vuex';
import store from '../../../../store';

export default {
  components: { BaseFormModal },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('productConfig/getProductsList', {
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
    store
      .dispatch('productFamilyConfig/getProductFamiliesList', {
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
    store
      .dispatch('productTypeConfig/getProductTypesList', {
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
        label: null,
        code: null,
      },
    };
  },
  computed: {
    ...mapGetters('propertyConfig', ['property']),
    title() {
      return this.property
        ? this.$t('product.property.formUpdateTitle')
        : this.$t('product.property.formCreateTitle');
    },
  },
  created() {
    if (this.property) this.propertyForm = this.property;
  },
  beforeUnmount() {
    if (this.property)
      this.$store.commit('propertyConfig/SET_CURRENT_PROPERTY', null);
  },
  methods: {
    submitPropertyForm() {
      if (this.property)
        this.$store
          .dispatch('propertyConfig/updateProperty', this.propertyForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch('propertyConfig/addProperty', this.propertyForm)
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
