<template>
  <BaseModal :title="`Approvisionnement ${product.name}`" modal-size="lg">
    <div class="card mb-0">
      <form class="theme-form" @submit.prevent="submitStockEntryForm">
        <div class="card-body">
          <div class="mb-3">
            <div class="row align-items-center">
              <div class="col-md-6">
                <BaseInputGroup
                  v-model="stockEntryForm.reference"
                  :label="$t('common.attributes.reference')"
                  placeholder="E.g. STOCK-AP00001..."
                  :errors="errors?.reference"
                  required
                >
                  <button
                    :disabled="isUpdating"
                    type="button"
                    class="btn btn-success btn-iconsolid"
                    :title="$t('common.shuffle')"
                    @click.prevent="generateReference"
                  >
                    <i class="fa fa-random"></i>
                  </button>
                </BaseInputGroup>
              </div>
              <div class="col-md-6">
                <BaseSelect
                  v-model.number="stockEntryForm.enterprise_id"
                  :label="$t('common.attributes.structure')"
                  :options="enterprises"
                  key-label="name"
                  key-value="id"
                  :errors="errors?.enterprise_id"
                />
              </div>
            </div>
          </div>
          <div class="mb-3 mt-4">
            <ProductLineForm
              :product="product"
              :stock-entry-line-fields="stock_entry_line_fields"
            />
          </div>
          <div class="mb-3">
            <div class="row align-items-center">
              <div class="col-md">
                <BaseTextArea
                  v-model="stockEntryForm.description"
                  :label="$t('common.attributes.description')"
                  rows="4"
                  placeholder="Description..."
                  :errors="errors?.description"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="row justify-content-end">
            <BaseButton
              type="button"
              class="btn btn-secondary col-auto m-r-5"
              :text="$t('common.cancel')"
              @click.prevent="$router.push({ name: 'product.form.stock' })"
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
  </BaseModal>
</template>

<script>
import store from '/@/store';
import BaseModal from '/@/components/common/BaseModal.vue';
import { mapGetters } from 'vuex';
import { stockFor, stockTypeCode } from '/@/helpers/codes';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import BaseTextArea from '/@/components/common/BaseTextArea.vue';
import { random } from 'lodash/number';
import ProductLineForm from '/@/components/products/ProductLineForm.vue';

export default {
  components: {
    ProductLineForm,
    BaseTextArea,
    BaseInputGroup,
    BaseSelect,
    BaseButton,
    BaseModal,
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
      is_edited: false,
      stockEntryForm: {
        enterprise_id: null,
        stock_type_id: null,
        reference: null,
        description: null,
      },
    };
  },
  computed: {
    ...mapGetters('stock_type', ['getListByTypeFor']),
    ...mapGetters('stock_entry', ['stockEntry']),
    ...mapGetters('enterprise', ['enterprises']),
    ...mapGetters('auth', ['isRoleAdmin']),
    ...mapGetters('product', ['product']),
    stockTypes() {
      return this.getListByTypeFor(stockFor.entry);
    },

    isUpdating() {
      return !!this.stockEntry;
    },
  },
  created() {
    const directType = this.stockTypes.find(
      (st) => st.code === stockTypeCode.directEntry
    );
    if (directType !== undefined)
      this.stockEntryForm.stock_type_id = directType.id;

    this.stock_entry_line_fields = [
      ...this.stock_entry_line_fields,
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
    submitStockEntryForm() {
      this.$store
        .dispatch('stock_entry/addStockEntry', this.stockEntryForm)
        .then((stockEntry) => {
          return this.$store.dispatch('stock_entry/addStockEntryLines', {
            stock_entry_lines: this.stock_entry_line_fields.map((sel) => {
              return {
                ...sel,
                stock_entry_id: stockEntry.id,
                buying_price: 0,
              };
            }),
          });
        })
        .then(() =>
          this.$router.push({
            name: 'product.form.stock',
          })
        )
        .catch((error) => {
          this.errors = error.response?.data?.errors;
          console.log(error);
        });
    },
    generateReference() {
      //todo complete generating ref algorithm
      this.stockEntryForm.reference = `STE-${new Date().getDay()}-${random(
        1000,
        1000000
      )}`;
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
