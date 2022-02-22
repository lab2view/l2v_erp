<template>
  <BaseContainer
    :module="$t('menu.modules.payments')"
    :title="$t('payments.title')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('payments.transactionType.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'config.payments.transaction.type.form' }"
              class="btn btn-primary"
              href="#"
              type="button"
            >
              <i class="fa fa-plus m-r-5" />
              {{ $t('common.add') }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="transactionTypes.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="transactionType in transactionTypes" :key="transactionType.id">
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

export default {
  components: { BaseContainer, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('transactionType/getTransactionTypesList', {
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
    ...mapGetters('transactionType', ['transactionTypes', 'transactionType']),
  },
  created() {
    if (this.transactionType)
      this.$store.commit('transactionType/SET_CURRENT_TRANSACTION_TYPE', null);
  },

  methods: {
    deleteTransactionType(transactionType) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: transactionType.label })
        )
      )
        this.$store.dispatch(
          'transactionType/deleteTransactionType',
          transactionType.id
        );
    },
  },
};
</script>

<style scoped></style>
