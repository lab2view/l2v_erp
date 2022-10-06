<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitStockEntryForm">
      <div class="card-header pb-0">
        <h5>{{ formTitle }}</h5>
        <span
          >Using the <a href="#">card</a> component, you can extend the default
          collapse behavior to create an accordion.</span
        >
      </div>
      <div class="card-body">
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <BaseSelect
                v-model.number="stockEntryForm.stock_type_id"
                :label="$t('common.attributes.stock_entry_type_id')"
                :options="stockTypes"
                key-label="label"
                key-value="id"
                :errors="errors?.stock_type_id"
                required
                :disabled="isUpdating"
              />
            </div>
            <div class="col-md">
              <BaseInputGroup
                v-model="stockEntryForm.reference"
                :label="$t('common.attributes.reference')"
                placeholder="E.g. STOCK-AP00001..."
                :errors="errors?.reference"
                required
                :disabled="isUpdating"
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
            <div v-if="isRoleAdmin" class="col-md">
              <BaseSelect
                v-model.number="stockEntryForm.enterprise_id"
                :label="$t('common.attributes.structure')"
                :options="enterprises"
                key-label="name"
                key-value="id"
                :errors="errors?.enterprise_id"
                :disabled="isUpdating"
              />
            </div>
          </div>
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
            @click.prevent="$router.push({ name: 'stocks.entries' })"
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
</template>

<script>
import store from '/@/store';
import { mapGetters } from 'vuex';
import { stockFor } from '/@/helpers/codes';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import BaseTextArea from '/@/components/common/BaseTextArea.vue';
import { random } from 'lodash/number';

export default {
  name: 'EntryDescription',
  components: {
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
      errors: [],
      loading: false,
      is_edited: false,
      stockEntryForm: {
        id: null,
        enterprise_id: null,
        stock_type_id: null,
        reference: null,
        description: null,
        forecast_date: null,
      },
    };
  },
  computed: {
    ...mapGetters('stock_type', ['getListByTypeFor']),
    ...mapGetters('stock_entry', ['stockEntry']),
    ...mapGetters('enterprise', ['enterprises']),
    ...mapGetters('auth', ['isRoleAdmin']),
    stockTypes() {
      return this.getListByTypeFor(stockFor.entry);
    },
    formTitle() {
      return this.stockEntry
        ? this.$t('stocks.form.entry.updateTitle')
        : this.$t('stocks.form.entry.createTitle');
    },
    isUpdating() {
      return !!this.stockEntry;
    },
  },
  watch: {
    stockEntryForm: {
      deep: true,
      handler() {
        this.is_edited = true;
      },
    },
  },
  created() {
    if (this.stockEntry) {
      this.stockEntryForm = { ...this.stockEntry };
      this.is_edited = false;
    }
  },
  methods: {
    submitStockEntryForm() {
      if (this.isUpdating) {
        if (this.is_edited)
          this.$store
            .dispatch('stock_entry/updateStockEntry', this.stockEntryForm)
            .then((stockEntry) =>
              this.$router.push({
                name: 'stocks.entry.form.article',
                params: { id: stockEntry.id },
              })
            )
            .catch((error) => {
              this.errors = error.response?.data?.errors;
              console.log(error);
            });
        else
          this.$router.push({
            name: 'stocks.entry.form.article',
            params: { id: this.stockEntry.id },
          });
      } else
        this.$store
          .dispatch('stock_entry/addStockEntry', this.stockEntryForm)
          .then((stockEntry) =>
            this.$router.push({
              name: 'stocks.entry.form.article',
              params: { id: stockEntry.id },
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

<style scoped></style>
