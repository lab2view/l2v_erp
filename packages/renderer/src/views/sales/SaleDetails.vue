<template>
  <BaseModal
    modal-size="xl"
    modal-body-class="p-0"
    :title="`Details de la vente - ${sale.code}`"
    modal-footer-class="modal-footer d-inline p-1"
  >
    <div class="row">
      <div class="col-md-4 p-r-0">
        <div class="card-body pt-3">
          <div class="checkout-details">
            <div class="order-box">
              <div class="title-box">
                <div class="checkbox-title">
                  <h6 class="mb-0">Details de la facturation</h6>
                </div>
              </div>
              <ul class="list-group p-0 p-b-20">
                <li
                  class="mt-3 d-flex justify-content-between align-items-center"
                >
                  {{ $t('common.attributes.cash_register_id') }}
                  <span>{{ cashRegisterLabel }}</span>
                </li>
                <li
                  class="mt-3 d-flex justify-content-between align-items-center"
                >
                  {{ $t('common.attributes.cashier') }}
                  <span>{{ cashierName }}</span>
                </li>
                <li
                  class="mt-3 d-flex justify-content-between align-items-center"
                >
                  {{ $t('common.attributes.sale_type') }}
                  <span>{{ sale.sale_type.label }}</span>
                </li>
              </ul>
              <ul
                class="sub-total mt-2"
                v-for="(collection, index) in cashierCollections"
                :key="collection.id"
              >
                <li class="text-end">
                  {{
                    $t('common.headers.pay_per_method', {
                      name: collection?.payment_method?.label ?? '--',
                    })
                  }}
                </li>
                <li>
                  <span class="f-w-400">{{ $t('common.headers.cashin') }}</span>
                  <span class="float-end f-14 f-w-600">
                    {{ collection.cashin }}
                  </span>
                </li>
                <li>
                  <span class="f-w-400">{{
                    $t('common.headers.cashout')
                  }}</span>
                  <span class="float-end f-14 f-w-600">
                    {{ collection.cashout }}
                  </span>
                </li>
              </ul>

              <ul class="sub-total total mt-3">
                <li>
                  Total
                  <span class="float-end f-16 f-w-600">
                    {{ `${selectableSale.sale_amount.toFixed()} ${currency}` }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md p-l-0">
        <div
          class="search-page border shadow-sm table-responsive m-0 vertical-scroll scroll-demo"
        >
          <table class="table table-hover display">
            <thead>
              <tr>
                <th class="text-capitalize">
                  {{ $tc('common.fields.article', 2) }}
                </th>
                <th class="text-capitalize">
                  {{ $t('common.headers.quantity') }}
                </th>
                <th class="text-capitalize">
                  {{ $t('common.headers.price') }}
                </th>
                <th class="text-capitalize">
                  {{ $t('common.attributes.discount') }}
                </th>
                <th class="text-capitalize">
                  {{ $t('common.headers.total') }}
                </th>
                <th v-if="!isCashierSession" class="text-capitalize">
                  {{ $t('common.headers.win_amount') }}
                </th>
                <th v-if="!isCashierSession">%</th>
              </tr>
            </thead>
            <tbody>
              <SaleStockExitLine
                v-for="stockExitLine in sale.stock_exit_lines"
                :key="`sale-exit-lne-${stockExitLine.id}`"
                :stock-exit-line="stockExitLine"
                :is-cashier-session="isCashierSession"
              />
            </tbody>
            <tfoot>
              <tr>
                <th class="text-uppercase">
                  {{ $t('common.headers.total_percent') }}
                </th>
                <th>
                  <label
                    v-for="(quantity, index) in selectableSale.quantities"
                    :key="`qty-line-${index}`"
                    class="f-w-700 m-r-5"
                  >
                    {{ quantity.total }}
                    <i class="f-w-400">{{ quantity.unit }}</i>
                  </label>
                </th>
                <th>
                  {{ `${selectableSale.sup_amount.toFixed(2)} ${currency}` }}
                </th>
                <th>
                  {{ `${selectableSale.discount.toFixed(2)} ${currency}` }}
                </th>
                <th>
                  {{ `${selectableSale.sale_amount.toFixed(2)} ${currency}` }}
                </th>
                <th v-if="!isCashierSession">
                  {{ `${selectableSale.sale_win_amount} ${currency}` }}
                </th>
                <th v-if="!isCashierSession">
                  {{ `${selectableSale.sale_win_amount_percent} %` }}
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="row align-items-center justify-content-end">
        <div
          v-if="customer"
          class="col f-w-600"
          :title="$t('common.attributes.customer_id')"
        >
          <a href="#" class="font-dark f-16" @click.prevent="">
            <i class="fa fa-user-o p-r-5" />
            {{
              `${customer.first_name} ${customer.name} - ${customer.phone} ${
                customer.email ? ' - ' + customer.email : ''
              }`
            }}
            - ( <span class="font-primary">{{ customer.reference }}</span> )
          </a>
        </div>
        <div class="col-auto">
          <BaseButton
            type="button"
            class="btn btn-secondary btn-sm col-auto m-r-5"
            :text="$t('common.close')"
            @click.prevent="$router.back()"
          />
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseModal from '/@/components/common/BaseModal.vue';
import SaleStockExitLine from '/@/components/sales/SaleStockExitLine.vue';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  name: 'SaleDetails',
  components: { BaseButton, SaleStockExitLine, BaseModal },
  computed: {
    ...mapGetters('workspace', ['currency']),
    ...mapGetters('sale', ['sale', 'getSelectedSaleById']),
    selectableSale() {
      return this.getSelectedSaleById(this.sale.id);
    },
    isCashierSession() {
      return this.$route.name === 'sales.session.reports.details';
    },
    cashRegisterLabel() {
      return this.sale?.cashier_session?.cash_register?.label ?? '--';
    },
    cashierName() {
      return (
        this.sale?.cashier_session?.cashier?.name ??
        this.sale?.cashier_session?.cashier?.code ??
        '--'
      );
    },
    cashierCollections() {
      return this.sale.cashier_session_collections;
    },
    customer() {
      return this.sale.customer ?? null;
    },
  },
};
</script>

<style scoped></style>
