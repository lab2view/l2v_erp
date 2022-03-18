<template>
  <router-view></router-view>
</template>

<script>
import store from '/@/store';
import { moduleCode } from '/@/helpers/codes';

export default {
  name: 'PaymentLayout',
  beforeRouteEnter(routeTo, routeFrom, next) {
    const hash = store.getters['transaction/getPaymentsHash'];
    if (hash) {
      return store
        .dispatch('initModuleSynchronisation', {
          module: moduleCode.payments,
          hash: hash,
          mutation: 'transaction',
        })
        .finally(() => next());
    } else {
      const field = { page: 1, field: {} };
      return Promise.all([
        store.dispatch('payment_method/getPaymentMethodsList', field),
        store.dispatch('payment_charge/getPaymentChargesList', field),
        store.dispatch('transaction_type/getTransactionTypesList', field),
        store.dispatch('transaction/getTransactionsList', field),
        store.dispatch('getLastHash', moduleCode.payments).then((data) => {
          store.commit('transaction/SET_PAYMENTS_HASH', data.hash);
          return data;
        }),
      ])
        .then(() => next())
        .catch((error) => {
          console.log(error);
          next();
        });
    }
  },
};
</script>

<style scoped></style>
