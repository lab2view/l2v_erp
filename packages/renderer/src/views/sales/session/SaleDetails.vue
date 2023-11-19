<template>
  <BaseModal
    :title="`${$t('common.sale.detail')} - ${cashierSale.code}`"
    modal-size="lg"
  >
    <div class="card-body pt-0">
      <span>
        REFERENCE <i class="float-end">{{ cashierSale.reference }}</i>
      </span>
      <hr class="m-1" />
      <span>
        TYPE DE VENTE
        <span class="float-end"> {{ `${cashierSale.sale_type.label}` }}</span>
      </span>
      <hr class="m-1" />
      <span>
        MODE DE PAIEMENT
        <span class="float-end">
          {{ `${paymentCollection.payment_method.label}` }}</span
        >
      </span>
      <hr class="m-1" />
      <span>
        ENCAISSEMENT
        <span class="float-end">
          {{ `${paymentCollection.cashin} ${currency}` }}</span
        >
      </span>
      <hr class="m-1" />
      <span>
        REMBOUSEMENT
        <span class="float-end">
          {{ `${paymentCollection.cashout} ${currency}` }}</span
        >
      </span>
      <hr class="m-1" />
      <ul class="list-group">
        <li
          v-for="stockExitLine in cashierSale.stock_exit_lines"
          :key="stockExitLine.id"
          class="list-group-item"
        >
          {{ `${stockExitLine.article.name} x${stockExitLine.quantity}` }}
          <span class="float-end">{{
            ` ${stockExitLine.sup_price} ${currency}`
          }}</span>
        </li>
      </ul>
      <span>
        {{ cashierSale.discount ? 'SOUS TOTAL' : 'TOTAL' }}
        <span class="float-end"> {{ `${getTotalAmount} ${currency}` }}</span>
      </span>
      <hr class="m-1" />
      <span v-if="cashierSale.discount">
        {{ $t('common.fields.discount').toUpperCase() }}
        <span class="float-end">
          {{ `-${cashierSale.discount} ${currency}` }}</span
        >
      </span>
      <hr class="m-1" />
      <span v-if="cashierSale.discount">
        TOTAL
        <span class="float-end"> {{ `${getSaleAmount} ${currency}` }}</span>
      </span>
      <hr class="m-1" />
      <span v-if="cashierSale.customer">
        CLIENT
        <span class="float-end">
          {{
            `${cashierSale.customer.first_name} ${cashierSale.customer.name}`
          }}</span
        >
      </span>
    </div>
    <template #footer>
      <BaseButton
        type="button"
        class="btn btn-secondary m-r-5"
        :text="$t('common.cancel')"
        @click.prevent="$router.back()"
      />
      <BaseButton
        type="button"
        icon="fa fa-printer"
        class="btn btn-primary"
        :text="$t('common.sale.print')"
        @click.prevent="printSaleTicket"
      />
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '/@/components/common/BaseModal.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';
import { sumBy } from 'lodash';
export default {
  name: 'SaleDetails',
  components: { BaseButton, BaseModal },
  computed: {
    ...mapGetters('sale', ['cashierSale']),
    ...mapGetters('workspace', ['currency']),
    getTotalAmount() {
      return sumBy(this.cashierSale.stock_exit_lines, 'sup_price');
    },
    getSaleAmount() {
      return this.getTotalAmount - this.cashierSale.discount;
    },
    paymentCollection() {
      return this.cashierSale.cashier_session_collections[0];
    },
  },
  methods: {
    printSaleTicket() {
      this.$store
        .dispatch('printer/printSaleBill', this.cashierSale)
        .then(() => this.$router.back());
    },
  },
};
</script>

<style scoped></style>
