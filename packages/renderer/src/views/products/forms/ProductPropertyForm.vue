<template>
  <div class="card rounded shadow-sm">
    <div class="card-header p-3">
      <h5>{{ $t('products.property.formCreateTitle') }}</h5>
    </div>
    <form class="theme-form" @submit.prevent="submitProductPropertyForm">
      <div class="card-body pb-0 pt-2">
        <div v-if="!productProperty" class="mb-3">
          <BaseFieldGroup
            :label="$t('common.attributes.property_id')"
            required
            :errors="errors?.property_id"
            @btn-click="
              $router.push({
                name: 'product.form.setting.property.form.property',
                params: { ...$route.params },
              })
            "
          >
            <BaseSelect
              v-model="productPropertyForm.property_id"
              :options="selectProperties"
              key-label="label"
              key-value="id"
              required
            />
          </BaseFieldGroup>
        </div>
        <div class="mb-3">
          <div class="row align-items-end">
            <div class="col">
              <BaseInput
                v-model="productPropertyForm.value"
                :label="$t('common.attributes.value')"
                rel="any"
                placeholder="E.g. 60GB"
                :errors="errors?.value"
                required
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
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import store from '/@/store';

export default {
  components: {
    BaseFieldGroup,
    BaseButton,
    BaseInput,
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
      },
    };
  },
  computed: {
    ...mapGetters('property', ['properties']),
    selectProperties() {
      return this.properties.filter((property) => {
        return (
          this.product.product_properties.find(
            (p) => p.id === property.id
          ) === undefined
        );
      });
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
  },
};
</script>

<style scoped></style>
