<template>
  <BaseModal
    modal-size="lg"
    modal-body-class="p-0"
    :title="`Details de la vente - ${sale.code}`"
  >
    <div class="search-page table-responsive m-0">
      <table class="table table-hover display">
        <thead>
          <tr>
            <th class="text-capitalize">
              {{ $tc('common.fields.article', 2) }}
            </th>
            <th class="text-capitalize">{{ $t('common.headers.quantity') }}</th>
            <th class="text-capitalize">
              {{ $t('common.headers.price') }}
            </th>
            <th class="text-capitalize">
              {{ $t('common.attributes.discount') }}
            </th>
            <th class="text-capitalize">
              {{ $t('common.headers.total') }}
            </th>
            <th class="text-capitalize" v-if="!isCashierSession">
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
            <th>{{ `${selectableSale.sup_amount.toFixed(2)} ${currency}` }}</th>
            <th>{{ `${selectableSale.discount.toFixed(2)} ${currency}` }}</th>
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
    <template #footer>
      <div class="row justify-content-end">
        <BaseButton
          type="button"
          class="btn btn-secondary btn-sm col-auto m-r-5"
          :text="$t('common.close')"
          @click.prevent="$router.back()"
        />
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
  },
};
</script>

<style scoped></style>
