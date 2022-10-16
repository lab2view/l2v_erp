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
              <button
                :title="$t('common.update')"
                class="btn btn-secondary btn-xs"
                data-original-title="btn btn-secondary btn-xs"
                type="button"
                @click.prevent="
                  $router.push({
                    name: 'config.payments.transaction.type.form',
                    params: { id: transactionType.id },
                  })
                "
              >
                {{ $t('common.update') }}
              </button>
              <button
                :title="$t('common.delete')"
                class="btn btn-danger btn-xs m-l-5"
                data-original-title="btn btn-danger btn-xs"
                type="button"
                @click.prevent="deleteTransactionType(transactionType)"
              >
                <i class="fa fa-trash-o" />
              </button>
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

export default {
  components: { BaseTableHeader, BaseContainer, BaseDatatable },
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
