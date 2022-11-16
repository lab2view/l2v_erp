<template>
  <BaseFormModal
    :submit-form="submitArticlesPricesForm"
    :title="$t('articles.price.form.title')"
  >
    <div class="row form-group mb-3">
      <div class="col-md">
        <BaseFieldGroup
          :with-refresh="true"
          :label="$t('common.attributes.product_family')"
          refresh-action-name="product_family/getProductFamiliesList"
          :with-append="false"
        >
          <BaseSelect
            v-model.number="articleFilter.product_family_id"
            :options="productFamilies"
            key-label="label"
            key-value="id"
          />
        </BaseFieldGroup>
      </div>
      <div class="col-md">
        <BaseFieldGroup
          :with-refresh="true"
          :label="$t('common.attributes.product_type')"
          refresh-action-name="product_type/getProductTypesList"
          :with-append="false"
          required
        >
          <BaseSelect
            v-model.number="articleFilter.product_type_id"
            :options="filterProductTypes"
            key-label="label"
            key-value="id"
            required
          />
        </BaseFieldGroup>
      </div>
    </div>
    <div class="row align-items-end form-group">
      <div class="col-md">
        <BaseFieldGroup
          :with-refresh="true"
          :label="$t('common.attributes.product_unit')"
          refresh-action-name="product_unit/getProductUnitsList"
          :with-append="false"
        >
          <BaseSelect
            v-model.number="articleFilter.product_unit_id"
            :options="productUnits"
            key-label="label"
            key-value="id"
          />
        </BaseFieldGroup>
      </div>
      <div class="col-md">
        <BaseSwitchInput
          v-model="articleFilter.sell_price_not_set"
          :label="$t('articles.price.form.not_set_price')"
        />
      </div>
    </div>
    <hr />
    <div class="form-group">
      <BaseFieldGroup
        :with-refresh="true"
        :label="$t('common.attributes.price_type_id')"
        refresh-action-name="price_type/getPriceTypeList"
        :with-append="false"
        required
      >
        <BaseSelect
          v-model.number="articlePriceField.price_type_id"
          :options="priceTypes"
          key-label="label"
          key-value="id"
          required
        />
      </BaseFieldGroup>
    </div>
    <div class="form-group">
      <BaseInput
        v-model.number="articlePriceField.value"
        :label="$t('articles.price.form.price_value', { currency })"
        type="number"
        placeholder=""
        required
      />
    </div>
    <template #footer>
      <div class="row align-items-center justify-content-end">
        <div class="col f-w-600">
          {{
            `${articles.length} ${$tc(
              'common.fields.article',
              articles.length
            )}`
          }}
        </div>
        <div class="col-auto">
          <BaseButton
            :text="$t('common.save')"
            class="btn btn-primary"
            type="submit"
            :loading="loading"
            icon="fa fa-save"
          />
        </div>
      </div>
    </template>
  </BaseFormModal>
</template>

<script>
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import ArticleFilterMixin from '/@/mixins/ArticleFilterMixin';
import BaseSwitchInput from '/@/components/common/BaseSwitchInput.vue';
import store from '/@/store/index.js';
import { mapGetters } from 'vuex';
import BaseInput from '/@/components/common/BaseInput.vue';

export default {
  name: 'ArticlePricesForm',
  mixins: [ArticleFilterMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('price_type/getPriceTypeList', {
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
  components: {
    BaseInput,
    BaseSwitchInput,
    BaseSelect,
    BaseFieldGroup,
    BaseButton,
    BaseFormModal,
  },
  data() {
    return {
      loading: false,
      articlePriceField: {
        price_type_id: null,
        article_id: null,
        value: null,
      },
    };
  },
  computed: {
    ...mapGetters('workspace', ['currency']),
    ...mapGetters('price_type', ['priceTypes']),
  },
  methods: {
    submitArticlesPricesForm() {
      if (confirm('Confirmez ???')) {
        this.loading = true;
        const priceFields = this.articles.map((art) => {
          return { ...this.articlePriceField, article_id: art.id };
        });
        console.log(priceFields);
      }
    },
  },
};
</script>

<style scoped></style>
