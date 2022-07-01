<template>
  <div class="card-body mt-0">
    <form @submit.prevent="handleSaleProcessButton">
      <div class="row align-items-end">
        <div class="col">
          <div class="row justify-content-center mb-2">
            <div class="col-md-5">
              <BaseFieldGroup
                @btn-click="
                  $router.push({
                    name: 'sales.session.customer.form',
                  })
                "
              >
                <BaseSelect
                  v-model="customer"
                  :options="getCustomerForSelect2"
                  :searchable="true"
                  :placeholder="$t('common.fields.add_customer')"
                />
              </BaseFieldGroup>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <BaseCheckboxGroup
                v-model="paymentMethodId"
                :options="paymentMethods"
                key-value="id"
                key-label="label"
                :label="`${$t('common.fields.payment_method')} ?`"
                label-class="font-primary"
              />
            </div>
            <div class="col-3 align-items-start">
              <BaseSelect
                v-model.number="saleTypeId"
                label-class="font-primary"
                :label="`${$t('common.fields.sale_type')} ?`"
                :options="saleTypes"
                key-value="id"
                key-label="label"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <table class="table table-bordered">
                <tbody>
                  <tr class="table-success">
                    <td class="font-primary bg-white" style="width: 20%">
                      <h6 class="mb-0">
                        {{ $t('common.attributes.sub_price') }} :
                      </h6>
                    </td>
                    <td class="font-primary bg-white" style="width: 30%">
                      <h5 class="mb-0 f-w-600 p-l-10">
                        {{ `${getCurrentSaleSupAmount} ${currency}` }}
                      </h5>
                    </td>
                    <td
                      class="font-primary"
                      style="width: 50%"
                      rowspan="2"
                      colspan="2"
                    >
                      <h6 class="mb-0">
                        {{ $t('common.attributes.total_price') }}
                      </h6>
                      <h3 class="text-center text- f-w-800">
                        {{ `${getCurrentSaleTotalAmount} ${currency}` }}
                      </h3>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-primary" style="width: 20%">
                      <h6 class="mb-0">
                        {{ $t('common.attributes.discount') }} :
                      </h6>
                    </td>
                    <td class="font-primary" style="width: 30%">
                      <h5 class="mb-0 f-w-600 p-l-10">
                        {{ `${getCurrentSaleDiscountAmount} ${currency}` }}
                      </h5>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-primary">
                      <h6 class="mb-0">
                        {{ $t('common.attributes.tax_id').toUpperCase() }} :
                      </h6>
                    </td>
                    <td class="font-primary">
                      <h5 class="mb-0 f-w-600 p-l-10">
                        {{ `${getCurrentSaleTaxAmount} ${currency}` }}
                      </h5>
                    </td>
                    <td class="font-primary">
                      <h6 class="mb-0 f-w-600 p-l-10">
                        {{ $t('common.attributes.receive_amount') }} :
                      </h6>
                    </td>
                    <td class="font-primary">
                      <BaseInputGroup
                        v-model.number="cash_in_amount"
                        :disabled="!isCashPaymentMethod"
                        type="number"
                        :placeholder="$t('common.attributes.amount')"
                        :min="getCurrentSaleTotalAmount"
                        class="font-primary f-w-600 form-control f-40"
                      >
                        <span class="input-group-text font-primary pt-1 pb-1">
                          {{ currency }}
                        </span>
                      </BaseInputGroup>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-primary">
                      <h6 class="mb-0">
                        {{ $t('common.attributes.total_article') }} :
                      </h6>
                    </td>
                    <td class="font-primary">
                      <h5 class="mb-0 f-w-600 p-l-10">
                        {{ getCurrentSaleArticleCount }}
                      </h5>
                    </td>
                    <td class="font-primary">
                      <h6 class="mb-0 f-w-600 p-l-10">
                        {{ $t('common.attributes.change_price') }} :
                      </h6>
                    </td>
                    <td class="font-primary">
                      <h5 class="mb-0 p-l-10">
                        {{ `${getCurrentSaleCashOutAmount} ${currency}` }}
                      </h5>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-auto">
          <div class="row">
            <BaseButton
              type="button"
              :text="
                isCurrentSaleHaveArticle
                  ? $t('common.send_current_sale_in_background')
                  : $t('common.show_background_sale')
              "
              class="btn btn-outline-primary btn-block mb-3"
              @click.prevent="
                isCurrentSaleHaveArticle
                  ? saveCurrentSaleInBackground()
                  : $router.push({ name: 'sales.session.request' })
              "
            />
          </div>
          <div class="row">
            <BaseButton
              :disabled="!isCurrentSaleHaveArticle"
              type="button"
              :text="$t('common.make_an_discount')"
              class="btn btn-outline-primary btn-block mb-3"
              :class="{ 'font-primary': !isCurrentSaleHaveArticle }"
              @click.prevent="$router.push({ name: 'sales.session.discount' })"
            />
          </div>
          <div class="row">
            <BaseButton
              :text="$t('common.process_sale').toUpperCase()"
              class="btn btn-primary-light btn-lg"
              :loading="loading"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';
import BaseCheckboxGroup from '/@/components/common/BaseCheckboxGroup.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { cashPaymentMethodCode } from '/@/helpers/codes.js';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import { last } from 'lodash';
import store from '/@/store/index.js';
export default {
  components: {
    BaseFieldGroup,
    BaseSelect,
    BaseCheckboxGroup,
    BaseButton,
    BaseInputGroup,
  },
  data() {
    return {
      loading: false,
      errors: [],
    };
  },
  computed: {
    ...mapGetters('cashier_session', [
      'getCurrentSaleSupAmount',
      'getCurrentSaleArticleCount',
      'getCurrentSaleTotalAmount',
      'getCurrentSaleTaxAmount',
      'getCurrentSaleDiscountAmount',
      'getCurrentSaleCashOutAmount',
      'isCurrentSaleHaveArticle',
    ]),
    ...mapGetters('workspace', ['currency']),
    ...mapGetters('payment_method', ['paymentMethods']),
    ...mapGetters('sale_type', ['saleTypes']),
    ...mapGetters('customer', ['getCustomerForSelect2']),
    ...mapGetters('printer', ['printAfterSale']),
    isCashPaymentMethod() {
      const paymentMethod = this.paymentMethods.find(
        (pm) => pm.id === this.paymentMethodId
      );
      return paymentMethod !== undefined
        ? paymentMethod.code === cashPaymentMethodCode
        : false;
    },
    paymentMethodId: {
      get() {
        return this.$store.state.cashier_session.currentSaleRequest
          ?.payment_method_id;
      },
      set(value) {
        this.$store.commit('cashier_session/SET_CURRENT_SALE_REQUEST_FIELD', {
          value: parseInt(value),
          field: 'payment_method_id',
        });
        this.$store.commit('cashier_session/SET_CURRENT_SALE_REQUEST_FIELD', {
          value: null,
          field: 'cashin',
        });
      },
    },
    saleTypeId: {
      get() {
        return this.$store.state.cashier_session.currentSaleRequest
          ?.sale_type_id;
      },
      set(value) {
        this.$store.commit('cashier_session/SET_CURRENT_SALE_REQUEST_FIELD', {
          value,
          field: 'sale_type_id',
        });
      },
    },
    customer: {
      get() {
        const customer = this.getCustomerForSelect2.find(
          (c) =>
            c.id ===
            this.$store.state.cashier_session.currentSaleRequest?.customer_id
        );
        return customer ?? null;
      },
      set(value) {
        this.$store.commit('cashier_session/SET_CURRENT_SALE_REQUEST_FIELD', {
          value: value?.id,
          field: 'customer_id',
        });
      },
    },
    cash_in_amount: {
      get() {
        return this.$store.state.cashier_session.currentSaleRequest?.cashin;
      },
      set(value) {
        this.$store.commit('cashier_session/SET_CURRENT_SALE_REQUEST_FIELD', {
          value,
          field: 'cashin',
        });
      },
    },
  },
  watch: {
    getCustomerForSelect2(value) {
      const customer = last(value);
      if (customer) {
        this.$store.commit('cashier_session/SET_CURRENT_SALE_REQUEST_FIELD', {
          value: customer.id,
          field: 'customer_id',
        });
      }
    },
  },
  created() {
    store.dispatch('customer/getCustomersList', {
      page: 1,
      field: {},
    });
  },
  methods: {
    handleSaleProcessButton() {
      this.loading = true;
      this.errors = [];
      this.$store
        .dispatch('cashier_session/processToCurrentSaleRequest')
        .then((data) => {
          this.$store.commit('cashier_session/RESET_CURRENT_SALE_REQUEST');
          if (this.printAfterSale)
            this.$store.dispatch('printer/printSaleBill', data);
        })
        .catch((error) => (this.errors = error.response?.data?.errors))
        .finally(() => (this.loading = false));
    },
    saveCurrentSaleInBackground() {
      this.loading = true;
      this.errors = [];
      this.$store
        .dispatch('cashier_session/saveCurrentSaleInBackground')
        .catch((error) => (this.errors = error.response?.data?.errors))
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style scoped>
.btn-lg {
  font-size: 20px;
  padding-bottom: 10px;
  padding-top: 10px;
}
</style>
