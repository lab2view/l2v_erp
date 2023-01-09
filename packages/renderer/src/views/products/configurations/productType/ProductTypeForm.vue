<template>
  <BaseFormModal :title="title" :submit-form="submitProductTypeForm">
    <div class="mb-3">
      <BaseFieldGroup
        :with-refresh="true"
        :label="$t('common.attributes.product_family')"
        refresh-action-name="product_family/getProductFamiliesList"
        :with-append="false"
        required
        :errors="errors?.product_family_id"
      >
        <BaseSelect
          v-model.number="productTypeForm.product_family_id"
          :options="productFamilies"
          key-label="label"
          required
          key-value="id"
        />
      </BaseFieldGroup>
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="productTypeForm.label"
        :label="$t('common.attributes.label')"
        type="text"
        placeholder="Pagne, Smartphone, ..."
        :errors="errors?.label"
        required
      />
    </div>
    <div class="mb-3">
      <BaseTextArea
        v-model="productTypeForm.description"
        :label="$t('common.attributes.description')"
        type="text"
        placeholder="Description... "
        :errors="errors?.description"
        required
      />
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold">{{
        $t('common.attributes.stock_config')
      }}</label>
      <div class="row">
        <div class="col-3">
          <BaseInput
            v-model="productTypeForm.min_stock"
            :label="$t('common.attributes.min')"
            type="number"
            placeholder="5"
            :errors="errors?.min_stock"
          />
        </div>
        <div class="col-3">
          <BaseInput
            v-model="productTypeForm.max_stock"
            :label="$t('common.attributes.max')"
            type="number"
            placeholder="100"
            :errors="errors?.max_stock"
          />
        </div>
        <div class="col-3">
          <BaseInput
            v-model="productTypeForm.critical_stock"
            :label="$t('common.attributes.critical')"
            type="number"
            placeholder="1"
            :errors="errors?.critical_stock"
          />
        </div>
        <div class="col-3">
          <BaseInput
            v-model="productTypeForm.alert_stock"
            :label="$t('common.attributes.alert')"
            type="number"
            placeholder="3"
            :errors="errors?.alert_stock"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <BaseButton
        class="btn btn-primary col-auto"
        :text="$t('common.save')"
        icon="fa fa-save"
        :loading="loading"
      />
    </template>
  </BaseFormModal>
</template>

<script>
import BaseFormModal from '../../../../components/common/BaseFormModal.vue';
import { mapGetters } from 'vuex';
import store from '/@/store';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseTextArea from '/@/components/common/BaseTextArea.vue';

export default {
  name: 'ProductTypeForm',
  components: {
    BaseTextArea,
    BaseInput,
    BaseSelect,
    BaseFieldGroup,
    BaseButton,
    BaseFormModal,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('product_family/getProductFamiliesList', {
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
      loading: false,
      errors: [],
      productTypeForm: {
        id: null,
        product_family_id: null,
        label: null,
        code: null,
        min_stock: 5,
        max_stock: 100,
        critical_stock: 1,
        alert_stock: 3,
      },
    };
  },
  computed: {
    ...mapGetters('product_type', ['productType']),
    ...mapGetters('product_family', ['productFamilies']),
    title() {
      return this.productType
        ? this.$t('products.productType.formUpdateTitle')
        : this.$t('products.productType.formCreateTitle');
    },
  },
  created() {
    if (this.productType) this.productTypeForm = this.productType;
    else
      this.productTypeForm.product_family_id =
        this.$route.query.product_family_id ?? null;
  },
  beforeUnmount() {
    if (this.productType)
      this.$store.commit('product_type/SET_CURRENT_PRODUCT_FAMILY', null);
  },
  methods: {
    submitProductTypeForm() {
      if (this.loading) return;

      this.loading = true;
      if (this.productType)
        this.$store
          .dispatch('product_type/updateProductType', this.productTypeForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            this.loading = false;
            console.log(error);
          });
      else
        this.$store
          .dispatch('product_type/addProductType', this.productTypeForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            this.loading = false;
            console.log(error);
          });
    },
  },
};
</script>

<style scoped></style>
