<template>
  <div :class="`card-body mt-0 ${saleScreenSmall ? 'pt-1' : ''}`">
    <div class="row align-items-end">
      <div class="col">
        <div
          :class="`row justify-content-center ${
            saleScreenSmall ? 'mb-1' : 'mb-2'
          }`"
        >
          <div :class="saleScreenSmall ? `col-md pt-0 pb-0` : `col-md-6`">
            <BaseFieldGroup
              :with-refresh="true"
              refresh-action-name="customer/getCustomersList"
              :with-global-load="true"
              @btn-click="
                $router.push({
                  name: 'sales.session.customer.form',
                })
              "
            >
              <BaseSelect
                v-model="customer"
                class="p-0"
                :options="getCustomerForSelect2"
                :searchable="true"
                :placeholder="$t('common.fields.add_customer')"
              />
            </BaseFieldGroup>
          </div>
        </div>
        <div class="row align-items-end">
          <div class="col">
            <BaseCheckboxGroup
              v-model="paymentMethodId"
              required
              :options="paymentMethods"
              key-value="id"
              key-label="label"
              label-class="font-primary"
            />
          </div>
          <div class="col-3 align-items-start">
            <BaseFieldGroup
              :with-refresh="true"
              :with-append="false"
              refresh-action-name="sale_type/getSaleTypesList"
            >
              <BaseSelect
                v-model.number="saleTypeId"
                label-class="font-primary"
                :placeholder="$t('common.fields.sale_type')"
                :options="saleTypes"
                required
                key-value="id"
                key-label="label"
              />
            </BaseFieldGroup>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <td class="font-primary" style="width: 20%">
                    <h6 class="mb-0" :class="labelClass">
                      {{ $t('common.attributes.sub_price') }} :
                    </h6>
                  </td>
                  <td class="font-primary" style="width: 30%">
                    <h5 class="mb-0 f-w-600 p-l-10" :class="labelValueClass">
                      {{ `${getCurrentSaleSupAmount} ${currency}` }}
                    </h5>
                  </td>
                  <td
                    class="bg-light-primary font-primary"
                    style="width: 50%"
                    rowspan="2"
                    colspan="2"
                  >
                    <h6 class="mb-0" :class="labelClass">
                      {{ $t('common.attributes.total_price') }}
                    </h6>
                    <h3
                      class="text-center text- f-w-800"
                      :class="saleScreenSmall ? 'f-20' : ''"
                    >
                      {{ `${getCurrentSaleTotalAmount} ${currency}` }}
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td class="font-primary" style="width: 20%">
                    <h6 class="mb-0" :class="labelClass">
                      {{ $t('common.attributes.discount').toUpperCase() }} :
                    </h6>
                  </td>
                  <td class="font-primary" style="width: 30%">
                    <h5 class="mb-0 f-w-600 p-l-10" :class="labelValueClass">
                      {{ `${getCurrentSaleDiscountAmount} ${currency}` }}
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td class="font-primary">
                    <h6 class="mb-0" :class="labelClass">
                      {{ $t('common.attributes.tax_id').toUpperCase() }} :
                    </h6>
                  </td>
                  <td class="font-primary">
                    <h5 class="mb-0 f-w-600 p-l-10" :class="labelValueClass">
                      {{ `${getCurrentSaleTaxAmount} ${currency}` }}
                    </h5>
                  </td>
                  <td class="font-primary">
                    <h6 class="mb-0 f-w-600 p-l-10" :class="labelClass">
                      {{ $t('common.attributes.receive_amount') }} :
                    </h6>
                  </td>
                  <td class="font-primary">
                    <BaseInputGroup
                      v-model.number="cash_in_amount"
                      :disabled="!isCashPaymentMethod"
                      :required="isCashPaymentMethod"
                      type="number"
                      :placeholder="$t('common.attributes.amount')"
                      :min="getCurrentSaleTotalAmount"
                      step="any"
                      class="font-primary f-w-600 form-control f-40"
                    >
                      <span
                        class="input-group-text font-primary pt-1 pb-1"
                        :class="labelValueClass"
                      >
                        {{ currency }}
                      </span>
                    </BaseInputGroup>
                  </td>
                </tr>
                <tr>
                  <td class="font-primary">
                    <h6 class="mb-0" :class="labelClass">
                      {{ $t('common.attributes.total_article') }} :
                    </h6>
                  </td>
                  <td class="font-primary">
                    <h5 class="mb-0 f-w-600 p-l-10" :class="labelValueClass">
                      {{ getCurrentSaleArticleCount }}
                    </h5>
                  </td>
                  <td class="font-primary">
                    <h6 class="mb-0 f-w-600 p-l-10" :class="labelClass">
                      {{ $t('common.attributes.change_price') }} :
                    </h6>
                  </td>
                  <td class="font-primary">
                    <h5 class="mb-0 p-l-10" :class="labelValueClass">
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
                ? $t(
                    getLabelTranslateCode(
                      'common.send_current_sale_in_background'
                    )
                  )
                : $t(getLabelTranslateCode('common.show_background_sale'))
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
            :text="$t(getLabelTranslateCode('common.make_an_discount'))"
            class="btn btn-outline-primary btn-block mb-3"
            :class="{ 'font-primary': !isCurrentSaleHaveArticle }"
            @click.prevent="$router.push({ name: 'sales.session.discount' })"
          />
        </div>
        <div class="row">
          <BaseButton
            :text="
              $t(getLabelTranslateCode('common.process_sale')).toUpperCase()
            "
            class="btn btn-primary-light btn-lg"
            :loading="loading"
            :disabled="!isCurrentSaleHaveArticle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';
import BaseCheckboxGroup from '/@/components/common/BaseCheckboxGroup.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { cashPaymentMethodCode } from '/@/helpers/codes';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import store from '/@/store/index';

export default {
  components: {
    BaseFieldGroup,
    BaseSelect,
    BaseCheckboxGroup,
    BaseButton,
    BaseInputGroup,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters('cashier_session', [
      'getCurrentSaleCustomerId',
      'getCurrentSaleSupAmount',
      'getCurrentSaleArticleCount',
      'getCurrentSaleTotalAmount',
      'getCurrentSaleTaxAmount',
      'getCurrentSaleDiscountAmount',
      'getCurrentSaleCashOutAmount',
      'isCurrentSaleHaveArticle',
    ]),
    ...mapGetters('workspace', ['currency', 'saleScreenSmall']),
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
        return this.getCurrentSaleCustomerId
          ? this.getCustomerForSelect2.find(
              (c) => c.id === this.getCurrentSaleCustomerId
            )
          : null;
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
    labelClass() {
      return this.saleScreenSmall ? 'f-10' : '';
    },
    labelValueClass() {
      return this.saleScreenSmall ? 'f-12' : '';
    },
  },
  created() {
    store.dispatch('customer/getCustomersList', {
      page: 1,
      field: {},
    });
  },
  methods: {
    getLabelTranslateCode(code) {
      return this.saleScreenSmall ? `${code}_2` : code;
    },
    saveCurrentSaleInBackground() {
      this.$store.dispatch('cashier_session/saveCurrentSaleInBackground');
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
.bg-light-primary {
  background-color: rgba(27, 76, 67, 0.1);
}
.f-10 {
  font-size: 10px;
}
</style>
