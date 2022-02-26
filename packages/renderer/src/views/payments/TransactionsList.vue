<template>
  <BaseContainer
    :module="$t('menu.modules.payments')"
    :title="$t('payments.title')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('payments.transaction.listTitle') }}</h5>
          </div>
        </div>
      </div>
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="transactions.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.transaction_type') }}</th>
            <th>{{ $t('common.attributes.amount') }}</th>
            <th>{{ $t('common.attributes.fee') }}</th>
            <th>{{ $t('common.attributes.status') }}</th>
            <th>{{ $t('common.attributes.date') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td>{{ transaction.id }}</td>
            <td>{{ transaction.transaction_type.label }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.fee }}</td>
            <td>{{ transaction.status }}</td>
            <td>{{ transaction.paid_at }}</td>
            <td>
            </td>
          </tr>
        </BaseDatatable>
      </div>

      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';

export default {
  components: { BaseContainer, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('transaction/getTransactionsList', {
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
    ...mapGetters('transaction', ['transactions', 'transaction']),
  },
  created() {
    if (this.transaction)
      this.$store.commit('transaction/SET_CURRENT_TRANSACTION', null);
  },
};
</script>

<style scoped></style>
