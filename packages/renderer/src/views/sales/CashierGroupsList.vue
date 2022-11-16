<template>
  <BaseContainer :module="$t('menu.modules.sales')" :title="$t('sales.title')">
    <div class="card">
      <BaseTableHeader
        :title="$t('sales.cashierGroup.listTitle')"
        add-action-router-name="sales.cashier.group.form"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="cashier_group/getCashierGroupsList"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="cashierGroups.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="cashierGroup in cashierGroups" :key="cashierGroup.id">
            <td>{{ cashierGroup.id }}</td>
            <td>{{ cashierGroup.label }}</td>
            <td>
              <button
                class="btn btn-secondary btn-xs"
                type="button"
                data-original-title="btn btn-secondary btn-xs"
                :title="$t('common.update')"
                @click.prevent="
                  $router.push({
                    name: 'sales.cashier.group.form',
                    params: { id: cashierGroup.id },
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
                @click.prevent="deleteCashierGroup(cashierGroup)"
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
  name: 'CashierGroupsList',
  components: { BaseTableHeader, BaseContainer, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('cashier_group/getCashierGroupsList', {
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
    ...mapGetters('cashier_group', ['cashierGroups', 'cashierGroup']),
  },
  created() {
    if (this.cashierGroup)
      this.$store.commit('cashier_group/SET_CURRENT_CASHIER_GROUP', null);
  },

  methods: {
    deleteCashierGroup(cashierGroup) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: cashierGroup.label })
        )
      )
        this.$store.dispatch(
          'cashier_group/deleteCashierGroup',
          cashierGroup.id
        );
    },
  },
};
</script>

<style scoped></style>
