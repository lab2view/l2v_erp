<template>
  <BaseContainer :module="$t('menu.modules.sales')" :title="$t('sales.title')">
    <div class="card">
      <BaseTableHeader
        :title="$t('sales.cashRegister.listTitle')"
        add-action-router-name="sales.cashRegister.form"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="cash_register/getCashRegistersList"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="cashRegisters.length"
        >
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
              <BaseActionBtnGroup
                entity="CashRegister"
                :with-show-btn="false"
                @update="
                  $router.push({
                    name: 'sales.cashRegister.form',
                    params: { id: cashRegister.id },
                  })
                "
                @delete="deleteCashRegister(cashRegister)"
              >
                <BaseButton
                  v-if="canChangeState"
                  type="button"
                  :class="`btn btn-xs m-r-5 btn-${
                    cashRegister.disabled_at ? 'primary' : 'danger'
                  }`"
                  :title="
                    cashRegister.disabled_at
                      ? $t('common.states.enabled')
                      : $t('common.states.disabled')
                  "
                  @click.prevent="updateStatusCashRegister(cashRegister)"
                >
                  <i
                    :class="`fa fa-${
                      cashRegister.disabled_at ? 'check' : 'ban'
                    }`"
                  />
                </BaseButton>
              </BaseActionBtnGroup>
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
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  components: {
    BaseButton,
    BaseActionBtnGroup,
    BaseTableHeader,
    BaseContainer,
    BaseDatatable,
  },
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
    ...mapGetters('auth', ['isGrantedAction']),
    canChangeState() {
      return this.isGrantedAction('CashRegister.update');
    },
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
      store.dispatch('cash_register/updateCashRegister', {
        ...cashRegister,
        disabled_at: cashRegister.disabled_at ? null : new Date(),
      });
    },
  },
};
</script>

<style scoped></style>
