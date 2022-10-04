<template>
  <BaseContainer
    :module="$t('menu.modules.payments')"
    :title="$t('payments.title')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('payments.transaction.listTitle')"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="transaction/getTransactionsList"
      />
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
            <td></td>
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
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  components: { BaseTableHeader, BaseContainer, BaseDatatable },
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
