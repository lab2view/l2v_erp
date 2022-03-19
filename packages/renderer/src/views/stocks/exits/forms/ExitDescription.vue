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
                v-model="stockExitForm.stock_type_id"
                :label="$t('common.attributes.stock_exit_type_id')"
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
                v-model="stockExitForm.reference"
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
          </div>
        </div>
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <BaseSelect
                v-model="stockExitForm.enterprise_id"
                :label="$t('common.fields.enterprise_from')"
                :options="sourceEnterprises"
                key-label="name"
                key-value="id"
                :errors="errors?.enterprise_id"
                :disabled="isUpdating"
              />
            </div>
            <div class="col-md">
              <BaseSelect
                v-model="stockExitForm.enterprise_receiver_id"
                :label="$t('common.fields.enterprise_to')"
                :options="targetEnterprises"
                key-label="name"
                key-value="id"
                :errors="errors?.enterprise_receiver_id"
                required
                :disabled="isUpdating"
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
            @click.prevent="$router.push({ name: 'stocks.exits' })"
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
import { stockFor, stockTypeCode } from '/@/helpers/codes.js';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import { random } from 'lodash/number.js';

export default {
  components: {
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
      stockExitForm: {
        id: null,
        stock_type_id: null,
        enterprise_id: null,
        enterprise_receiver_id: null,
        reference: null,
      },
    };
  },
  computed: {
    ...mapGetters('stock_type', ['getListByTypeFor']),
    ...mapGetters('stock_exit', ['stockExit']),
    ...mapGetters('enterprise', ['enterprises']),
    stockTypes() {
      return this.getListByTypeFor(stockFor.exit).filter(
        (t) => t.code !== stockTypeCode.sale
      );
    },
    sourceEnterprises() {
      return [
        { id: '', name: this.$t('common.parent') },
        ...this.enterprises.filter(
          (ent) =>
            ent.id.toString() !== this.stockExitForm.enterprise_receiver_id
        ),
      ];
    },
    targetEnterprises() {
      return this.enterprises.filter(
        (ent) => ent.id.toString() !== this.stockExitForm.enterprise_id
      );
    },
    formTitle() {
      return this.stockExit
        ? this.$t('stocks.form.exit.updateTitle')
        : this.$t('stocks.form.exit.createTitle');
    },
    isUpdating() {
      return !!this.stockExit;
    },
  },
  watch: {
    stockExitForm: {
      deep: true,
      handler() {
        this.is_edited = true;
      },
    },
  },
  created() {
    if (this.stockExit) {
      this.stockExitForm = { ...this.stockExit };
      this.is_edited = false;
    }
  },
  methods: {
    submitStockEntryForm() {
      if (this.isUpdating) {
        if (this.is_edited)
          this.$store
            .dispatch('stock_exit/updateStockExit', this.stockExitForm)
            .then((stockExit) =>
              this.$router.push({
                name: 'stocks.exit.form.article',
                params: { id: stockExit.id },
              })
            )
            .catch((error) => {
              this.errors = error.response?.data?.errors;
              console.log(error);
            });
        else
          this.$router.push({
            name: 'stocks.exit.form.article',
            params: { id: this.stockExit.id },
          });
      } else
        this.$store
          .dispatch('stock_exit/addStockExit', this.stockExitForm)
          .then((stockExit) =>
            this.$router.push({
              name: 'stocks.exit.form.article',
              params: { id: stockExit.id },
            })
          )
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
    },
    generateReference() {
      //todo complete generating ref algorithm for exit stock
      this.stockExitForm.reference = `STE-EXIT-${new Date().getDay()}-${random(
        1000,
        1000000
      )}`;
    },
  },
};
</script>

<style scoped></style>
