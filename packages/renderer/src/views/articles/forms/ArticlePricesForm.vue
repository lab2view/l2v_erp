<template>
  <BaseFormModal
    :submit-form="submitArticlesPricesForm"
    :title="$t('articles.price.form.title')"
    modal-size="md"
  >
    <div class="mb-3">
      <BaseFieldGroup
        :with-refresh="true"
        :label="$t('common.attributes.product_family')"
        refresh-action-name="product_family/getProductFamiliesList"
        :with-append="false"
      >
        <BaseSelect
          v-model.number="product_family_id"
          :options="productFamilies"
          key-label="label"
          key-value="id"
        />
      </BaseFieldGroup>
    </div>
    <div class="mb-3">
      <BaseFieldGroup
        :with-refresh="true"
        :label="$t('common.attributes.product_type')"
        refresh-action-name="product_type/getProductTypesList"
        :with-append="false"
      >
        <BaseSelect
          v-model.number="product_type_id"
          :options="filterProductTypes"
          key-label="label"
          key-value="id"
        />
      </BaseFieldGroup>
    </div>
    <div class="mb-3">
      <BaseFieldGroup
        :with-refresh="true"
        :label="$t('common.attributes.product_unit')"
        refresh-action-name="product_unit/getProductUnitsList"
        :with-append="false"
      >
        <BaseSelect
          v-model.number="product_unit_id"
          :options="productUnits"
          key-label="label"
          key-value="id"
        />
      </BaseFieldGroup>
    </div>
    <template #footer>
      <BaseButton
        :text="$t('common.save')"
        class="btn btn-primary"
        type="submit"
        :loading="loading"
        icon="fa fa-save"
      />
    </template>
  </BaseFormModal>
</template>

<script>
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import store from '/@/store/index';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'ArticlePricesForm',
  components: { BaseSelect, BaseFieldGroup, BaseButton, BaseFormModal },
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
      store.dispatch('product_unit/getProductUnitsList', {
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
      loading: false,
      articleFilter: {
        product_family_id: null,
        product_type_id: null,
        product_unit_id: null,
      },
    };
  },
  computed: {
    ...mapGetters('product_family', ['productFamilies']),
    ...mapGetters('product_type', ['productTypes']),
    ...mapGetters('product_unit', ['productUnits']),
    filterProductTypes() {
      return this.productTypes.filter((pt) =>
        this.product_family_id
          ? pt.product_family_id === this.product_family_id
          : true
      );
    },
  },
  methods: {
    submitArticlesPricesForm() {},
  },
};
</script>

<style scoped></style>
