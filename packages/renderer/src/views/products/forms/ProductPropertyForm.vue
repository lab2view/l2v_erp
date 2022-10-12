<template>
  <div class="card rounded shadow-sm">
    <div class="card-header p-3">
      <h6>{{ $t('products.property.formCreateTitle') }}</h6>
    </div>
    <form class="theme-form" @submit.prevent="submitProductPropertyForm">
      <div class="card-body pb-0 pt-2">
        <div v-if="!productProperty" class="mb-3">
          <BaseFieldGroup
            :label="$t('common.attributes.property_id')"
            required
            :errors="errors?.property_id"
            :with-refresh="true"
            refresh-action-name="property/getPropertiesList"
            @btn-click="
              $router.push({
                name: 'product.form.setting.property.form.property',
                params: { ...$route.params },
              })
            "
          >
            <BaseSelect
              v-model.number="productPropertyForm.property_id"
              :options="selectProperties"
              key-label="label"
              key-value="id"
              required
            />
          </BaseFieldGroup>
        </div>
        <div v-if="selectedProperty" class="mb-3">
          <div class="row align-items-end">
            <div class="col">
              <BasePropertyField
                v-model="productPropertyForm.value"
                :property="selectedProperty"
                @change-multiple="setProductPropertyFormMultipleField"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer pt-2 pb-2">
        <div class="row justify-content-center align-items-center">
          <BaseButton
            type="button"
            class="btn btn-secondary col-auto m-r-5"
            :text="$t('common.cancel')"
            @click.prevent="$router.back()"
          />
          <BaseButton
            class="btn btn-primary col-auto"
            :text="$t('common.save')"
            icon="fa fa-save"
            :loading="loading"
          />
        </div>
      </div>
    </form>
  </div>
  <router-view />
</template>

<script>
import { mapGetters } from 'vuex';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import store from '/@/store';
import BasePropertyField from '/@/components/common/BasePropertyField.vue';

export default {
  name: 'ProductPropertyForm',
  components: {
    BasePropertyField,
    BaseFieldGroup,
    BaseButton,
    BaseSelect,
  },
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
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      errors: [],
      loading: false,
      productPropertyForm: {
        id: null,
        property_id: null,
        value: null,
        is_multiple: false,
      },
    };
  },
  computed: {
    ...mapGetters('property', ['filterPropertiesByProduct']),
    properties() {
      return this.filterPropertiesByProduct(this.product);
    },
    selectProperties() {
      return this.properties.filter((property) => {
        return (
          this.product.product_properties.find(
            (p) => p.property_id === property.id
          ) === undefined
        );
      });
    },
    selectedProperty() {
      return this.properties.find(
        (p) => p.id === this.productPropertyForm.property_id
      );
    },
    productProperty() {
      return this.$route.params.product_property_id
        ? this.product.product_properties.find(
            (pp) => pp.id.toString() === this.$route.params.product_property_id
          )
        : null;
    },
  },
  created() {
    if (this.productProperty)
      this.productPropertyForm = { ...this.productProperty };
  },
  methods: {
    submitProductPropertyForm() {
      this.loading = true;
      if (this.productPropertyForm.id)
        this.$store
          .dispatch('product/updateProperty', this.productPropertyForm)
          .then(() => this.$router.back())
          .catch((error) => (this.errors = error.response?.data?.errors))
          .finally(() => (this.loading = false));
      else
        this.$store
          .dispatch('product/addProperties', [this.productPropertyForm])
          .then(() => this.$router.back())
          .catch((error) => (this.errors = error.response?.data?.errors))
          .finally(() => (this.loading = false));
    },
    setProductPropertyFormMultipleField(value) {
      this.productPropertyForm.is_multiple = value;
    },
  },
};
</script>

<style scoped></style>
