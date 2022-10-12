<template>
  <BaseFormModal
    :title="entryStockModalName"
    :submit-form="submitStockEntryForm"
    modal-size="lg"
  >
    <div class="mb-3">
      <div class="row">
        <div v-if="canShowEnterpriseField" class="col-md">
          <BaseFieldGroup
            :label="$t('common.attributes.structure')"
            :errors="errors?.enterprise_id"
            :with-refresh="true"
            :with-append="false"
            refresh-action-name="enterprise/getEnterprisesList"
          >
            <BaseSelect
              v-model.number="stockEntryForm.enterprise_id"
              :options="enterprises"
              key-label="name"
              key-value="id"
            />
          </BaseFieldGroup>
        </div>
        <div class="col-md">
          <BaseInputGroup
            v-model="stockEntryForm.reference"
            :label="$t('common.attributes.reference')"
            placeholder="E.g. STOCK-AP00001..."
            :errors="errors?.reference"
            required
          >
            <button
              type="button"
              class="btn btn-sm btn-success btn-iconsolid"
              :title="$t('common.shuffle')"
              @click.prevent="generateReference"
            >
              <i class="fa fa-random"></i>
            </button>
          </BaseInputGroup>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <BaseTextArea
        v-model="stockEntryForm.description"
        :label="$t('common.attributes.description')"
        rows="2"
        placeholder="Description..."
        :errors="errors?.description"
      />
    </div>

    <table class="table mb-3">
      <thead>
        <tr>
          <th scope="col">{{ $t('articles.listTitle') }}</th>
          <th class="text-center" scope="col" style="width: 120px">
            {{ $t('common.attributes.quantity') }}
            <span class="text-danger m-l-5">*</span>
          </th>
          <th scope="col" style="width: 210px">
            {{ $t('common.attributes.buying_price') }}
            <span class="text-danger m-l-5">*</span>
          </th>
          <th v-if="showRemoveAction" scope="col">
            {{ $t('common.actions') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <ProductEntryLineFormField
          v-for="(stockEntryLine, index) in stock_entry_line_fields"
          :key="`stc-ent-lne-form-${index}`"
          :update-field-method="updateStockEntryLineField"
          :stock-entry-line="stockEntryLine"
          :index="index"
          :errors="errors"
          :show-remove-action="showRemoveAction"
          @remove="removeStockEntryLineField"
        />
      </tbody>
    </table>

    <template #footer>
      <div class="row justify-content-end">
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
    </template>
  </BaseFormModal>
</template>

<script>
import store from '/@/store';
import { mapGetters } from 'vuex';
import { stockTypeCode } from '/@/helpers/codes';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import BaseTextArea from '/@/components/common/BaseTextArea.vue';
import { random } from 'lodash/number';
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import ProductEntryLineFormField from '/@/components/products/ProductEntryLineFormField.vue';

export default {
  name: 'Supply',
  components: {
    ProductEntryLineFormField,
    BaseFieldGroup,
    BaseFormModal,
    BaseTextArea,
    BaseInputGroup,
    BaseSelect,
    BaseButton,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('stock_type/getStockTypesList', {
        page: 1,
        field: {},
      }),
      store.dispatch('enterprise/getEnterprisesList', {
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
      stock_entry_line_fields: [],
      errors: [],
      loading: false,
      stockEntryForm: {
        enterprise_id: null,
        stock_type_id: null,
        reference: null,
        description: null,
      },
    };
  },
  computed: {
    ...mapGetters('enterprise', ['enterprises']),
    ...mapGetters('stock_type', ['stock_types']),
    ...mapGetters('auth', ['currentEnterpriseId']),
    ...mapGetters('product', ['product']),

    canShowEnterpriseField() {
      return !this.currentEnterpriseId;
    },
    stockEntryType() {
      const type = this.stock_types.find(
        (st) => st.code === stockTypeCode.directEntry
      );
      return type !== undefined ? type : null;
    },
    entryStockModalName() {
      return (
        this.stockEntryType?.label ??
        `${this.$t('common.provision')} - ${this.product.reference}`
      );
    },
    showRemoveAction() {
      return this.stock_entry_line_fields.length > 1;
    },
  },
  created() {
    this.stock_entry_line_fields = [
      ...this.product.articles.map((art) => {
        return {
          stock_entry_id: null,
          article_id: art.id,
          provider_id: null,
          quantity: 1,
          provider_price: null,
          buying_price: null,
        };
      }),
    ];
  },

  methods: {
    updateStockEntryLineField(stockEntryLine, index) {
      this.stock_entry_line_fields.splice(index, 1, stockEntryLine);
    },

    submitStockEntryForm() {
      if (this.stockEntryType) {
        this.loading = true;
        this.$store
          .dispatch('stock_entry/addStockEntry', {
            ...this.stockEntryForm,
            stock_type_id: this.stockEntryType.id,
            enterprise_id: this.currentEnterpriseId ?? null,
          })
          .then((stockEntry) => {
            return this.$store
              .dispatch('stock_entry/addStockEntryLines', {
                stock_entry_lines: this.stock_entry_line_fields.map((sel) => {
                  return {
                    ...sel,
                    stock_entry_id: stockEntry.id,
                  };
                }),
              })
              .then(() => this.$router.back())
              .catch((error) => {
                this.errors = error.response?.data?.errors;
                this.loading = false;
                console.log(error);
              });
          })
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            this.loading = false;
            console.log(error);
          });
      }
    },
    generateReference() {
      //todo complete generating ref algorithm
      this.stockEntryForm.reference = `STE-APP${
        this.product.id
      }-${new Date().getDay()}-${random(1000, 10000)}`;
    },
    removeStockEntryLineField(article_id) {
      this.stock_entry_line_fields = this.stock_entry_line_fields.filter(
        (s) => s.article_id !== article_id
      );
    },
  },
};
</script>

<style scoped>
.card.mb-0 {
  overflow-y: scroll !important;
  max-height: 700px !important;
}
</style>
