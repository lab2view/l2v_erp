<template>
  <BaseContainer :module="$t('menu.modules.sales')" :title="$t('sales.title')">
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('sales.cashRegister.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'sales.cashRegister.form' }"
              href="#"
              class="btn btn-primary"
              type="button"
            >
              <i class="fa fa-plus m-r-5" />
              {{ $t('common.add') }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="cashRegisters.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.structure') }}</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="cashRegister in cashRegisters" :key="cashRegister.id">
            <td>{{ cashRegister.id }}</td>
            <td>
              {{ cashRegister?.enterprise?.name || $t('common.parent') }}
            </td>
            <td>{{ cashRegister.label }}</td>
            <td>
              <button
                class="btn btn-secondary btn-xs"
                type="button"
                data-original-title="btn btn-secondary btn-xs"
                :title="$t('common.update')"
                @click.prevent="
                  $router.push({
                    name: 'sales.cashRegister.form',
                    params: { id: cashRegister.id },
                  })
                "
              >
                {{ $t('common.update') }}
              </button>
              <button
                class="btn btn-danger btn-xs m-l-5"
                type="button"
                data-original-title="btn btn-danger btn-xs"
                :title="$t('common.delete')"
                @click.prevent="deleteCashRegister(cashRegister)"
              >
                <i class="fa fa-trash-o" />
              </button>
              <button
                class="btn btn-danger btn-xs m-l-5"
                type="button"
                data-original-title="btn btn-light btn-xs"
                :title="$t('common.states.disabled')"
                @click.prevent="updateStatusCashRegister(cashRegister)"
              >
                <i class="fa fa-ban" />
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
      .dispatch('cash_register/getCashRegistersList', {
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
    ...mapGetters('cash_register', ['cashRegisters', 'cashRegister']),
  },
  created() {
    if (this.cashRegister)
      this.$store.commit('cash_register/SET_CURRENT_CASH_REGISTER', null);
  },

  methods: {
    deleteCashRegister(cashRegister) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: cashRegister.label })
        )
      )
        this.$store.dispatch(
          'cash_register/deleteCashRegister',
          cashRegister.id
        );
    },

    updateStatusCashRegister(cashRegister) {
      store.dispatch('cash_register/updateStatusCashRegister', cashRegister);
    },
  },
};
</script>

<style scoped></style>
