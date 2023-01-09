<template>
  <BaseContainer
    :module="$t('menu.modules.payments')"
    :title="$t('payments.title')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('payments.transactionType.listTitle')"
        add-action-router-name="config.payments.transaction.type.form"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="transaction_type/getTransactionTypesList"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="transactionTypes.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr
            v-for="transactionType in transactionTypes"
            :key="transactionType.id"
          >
            <td>{{ transactionType.id }}</td>
            <td>{{ transactionType.label }}</td>
            <td>
              <BaseActionBtnGroup
                entity="TransactionType"
                :with-show-btn="false"
                @update="
                  $router.push({
                    name: 'config.payments.transaction.type.form',
                    params: { id: transactionType.id },
                  })
                "
                @delete="deleteTransactionType(transactionType)"
              />
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
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';

export default {
  components: {
    BaseActionBtnGroup,
    BaseTableHeader,
    BaseContainer,
    BaseDatatable,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('transaction_type/getTransactionTypesList', {
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
    ...mapGetters('transaction_type', ['transactionTypes', 'transactionType']),
  },
  created() {
    if (this.transactionType)
      this.$store.commit('transaction_type/SET_CURRENT_TRANSACTION_TYPE', null);
  },

  methods: {
    deleteTransactionType(transactionType) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: transactionType.label })
        )
      )
        this.$store.dispatch(
          'transaction_type/deleteTransactionType',
          transactionType.id
        );
    },
  },
};
</script>

<style scoped></style>
