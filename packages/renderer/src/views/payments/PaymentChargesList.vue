<template>
  <BaseContainer
    :module="$t('menu.modules.payments')"
    :title="$t('payments.title')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('payments.paymentCharge.listTitle')"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="payment_charge/getPaymentChargesList"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="paymentCharges.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.payment_method') }}</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.attributes.amount') }}</th>
            <th>{{ $t('common.attributes.currency') }}</th>
            <th>{{ $t('common.attributes.date') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="paymentCharge in paymentCharges" :key="paymentCharge.id">
            <td>{{ paymentCharge.id }}</td>
            <td>{{ paymentCharge.paymentMethod.label }}</td>
            <td>{{ paymentCharge.label }}</td>
            <td>{{ paymentCharge.currency }}</td>
            <td>{{ paymentCharge.amount }}</td>
            <td>{{ paymentCharge.charged_at }}</td>
            <td></td>
          </tr>
        </BaseDatatable>
        <br />
      </div>

      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '../../store';
import { mapGetters } from 'vuex';
import BaseContainer from '../../components/common/BaseContainer.vue';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  name: 'PaymentChargesList',
  components: { BaseTableHeader, BaseContainer, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('payment_charge/getPaymentChargesList', {
        page: 1,
        field: {},
      })
      .then(() => {
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  computed: {
    ...mapGetters('payment_charge', ['paymentCharges', 'paymentCharge']),
  },
  created() {
    if (this.paymentCharge)
      this.$store.commit('payment_charge/SET_CURRENT_PAYMENT_CHARGE', null);
  },
};
</script>

<style scoped></style>
