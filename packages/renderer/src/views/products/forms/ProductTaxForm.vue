<template>
  <div class="card rounded shadow-sm">
    <div class="card-header p-3">
      <h6>{{ $t('products.tax.formCreateTitle') }}</h6>
    </div>
    <form class="theme-form" @submit.prevent="submitProductTaxForm">
      <div class="card-body pb-0 pt-2">
        <div v-if="!productTax" class="mb-3">
          <BaseFieldGroup
            :label="$t('common.attributes.tax_id')"
            required
            :errors="errors?.tax_id"
            :with-refresh="true"
            refresh-action-name="tax/getTaxesList"
            @btn-click="
              $router.push({
                name: 'product.form.setting.tax.form.tax',
                params: { ...$route.params },
              })
            "
          >
            <BaseSelect
              v-model="productTaxForm.tax_id"
              :options="selectTaxes"
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
                v-model="productTaxForm.value"
                :label="$t('common.attributes.value')"
                rel="any"
                placeholder="E.g. 19.25"
                :errors="errors?.value"
                required
              />
            </div>
            <div class="col">
              <BaseSwitchInput
                v-model="productTaxForm.is_percent"
                :label="$t('common.attributes.is_percent')"
                :errors="errors?.is_percent"
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
import BaseSwitchInput from '/@/components/common/BaseSwitchInput.vue';

export default {
  name: 'ProductTaxForm',
  components: {
    BaseSwitchInput,
    BaseFieldGroup,
    BaseButton,
    BaseInput,
    BaseSelect,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('tax/getTaxesList', {
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
      productTaxForm: {
        id: null,
        tax_id: null,
        value: null,
        is_percent: true,
      },
    };
  },
  computed: {
    ...mapGetters('tax', ['taxes']),
    selectTaxes() {
      return this.taxes.filter((tax) => {
        return (
          this.product.product_taxes.find((t) => t.id === tax.id) === undefined
        );
      });
    },
    productTax() {
      return this.$route.params.product_tax_id
        ? this.product.product_taxes.find(
            (pt) => pt.id.toString() === this.$route.params.product_tax_id
          )
        : null;
    },
  },
  created() {
    if (this.productTax) this.productTaxForm = { ...this.productTax };
  },
  methods: {
    submitProductTaxForm() {
      if (this.loading) return;

      this.loading = true;
      if (this.productTaxForm.id)
        this.$store
          .dispatch('product/updateTax', this.productTaxForm)
          .then(() => this.$router.back())
          .catch((error) => (this.errors = error.response?.data?.errors))
          .finally(() => (this.loading = false));
      else
        this.$store
          .dispatch('product/addTaxes', [this.productTaxForm])
          .then(() => this.$router.back())
          .catch((error) => (this.errors = error.response?.data?.errors))
          .finally(() => (this.loading = false));
    },
  },
};
</script>

<style scoped></style>
