<template>
  <BaseFormModal :title="title" :submit-form="submitPropertyForm">
    <div class="mb-3">
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
    <div class="mb-3">
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
    <div class="mb-3">
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
    <div class="mb-3">
      <BaseInput
        v-model="propertyForm.label"
        :label="$t('common.attributes.label')"
        placeholder="E.g. collections"
        :errors="errors?.label"
        required
      />
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
import BaseSelect from '../../../../components/common/BaseSelect.vue';
import BaseInput from '../../../../components/common/BaseInput.vue';

export default {
  components: { BaseInput, BaseSelect, BaseFormModal },
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
    ...mapGetters('propertyConfig', ['property']),
    ...mapGetters('productFamilyConfig', ['productFamilies']),
    ...mapGetters('productTypeConfig', ['productTypes']),

    title() {
      return this.property
        ? this.$t('product.property.formUpdateTitle')
        : this.$t('product.property.formCreateTitle');
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
