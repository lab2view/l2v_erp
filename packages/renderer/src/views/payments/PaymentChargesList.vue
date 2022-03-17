<template>
  <BaseContainer
    :module="$t('menu.modules.payments')"
    :title="$t('payments.title')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('payments.paymentCharge.listTitle') }}</h5>
          </div>
        </div>
      </div>
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="paymentCharges.length">
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
            <td>
            </td>
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

export default {
  components: { BaseContainer, BaseDatatable },
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
