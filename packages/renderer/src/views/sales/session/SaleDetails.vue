<template>
  <BaseModal
    :title="`${$t('common.sale.detail')} - ${cashierSale.code}`"
    modal-size="lg"
  >
    <div class="card-body pt-0">
      <h6>
        REFERENCE <i class="float-end">{{ cashierSale.reference }}</i>
      </h6>
      <hr />
      <h6>
        TYPE DE VENTE
        <span class="float-end"> {{ `${cashierSale.sale_type.label}` }}</span>
      </h6>
      <hr />
      <h6>
        MODE DE PAIEMENT
        <span class="float-end">
          {{ `${paymentCollection.payment_method.label}` }}</span
        >
      </h6>
      <hr />
      <h6>
        ENCAISSEMENT
        <span class="float-end">
          {{ `${paymentCollection.cashin} ${currency}` }}</span
        >
      </h6>
      <hr />
      <h6>
        REMBOUSEMENT
        <span class="float-end">
          {{ `${paymentCollection.cashout} ${currency}` }}</span
        >
      </h6>
      <hr />
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
      <br />
      <h6 v-if="cashierSale.discount">
        REDUCTION
        <span class="float-end">
          {{ `${cashierSale.discount} ${currency}` }}</span
        >
      </h6>
      <h6>
        {{ cashierSale.discount ? 'Sous Total' : 'TOTAL' }}
        <span class="float-end"> {{ `${getTotalAmount} ${currency}` }}</span>
      </h6>
      <h6 v-if="cashierSale.discount">
        TOTAL
        <span class="float-end"> {{ `${getSaleAmount} ${currency}` }}</span>
      </h6>
      <h6 v-if="cashierSale.customer">
        CLIENT
        <span class="float-end">
          {{
            `${cashierSale.customer.first_name} ${cashierSale.customer.name}`
          }}</span
        >
      </h6>
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
  components: { BaseButton, BaseModal },
  computed: {
    ...mapGetters('sale', ['cashierSale']),
    ...mapGetters('workspace', ['currency']),
    getTotalAmount() {
      return sumBy(this.cashierSale.stock_exit_lines, 'price');
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
      this.$store.dispatch('printer/printSaleBill', this.cashierSale);
    },
  },
};
</script>

<style scoped></style>
