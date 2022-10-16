<template>
  <BaseContainer :module="$t('menu.modules.sales')" :title="$t('sales.title')">
    <div class="card">
      <BaseTableHeader
        :title="$t('sales.cashier.listTitle')"
        add-action-router-name="sales.cashier.form"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="cashier/getCashiersList"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="cashiers.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.group') }}</th>
            <th>{{ $t('common.attributes.structure') }}</th>
            <th class="text-center">
              {{ $t('common.attributes.last_name') }}
            </th>
            <th>{{ $t('common.attributes.start_at') }}</th>
            <th class="text-center">{{ $t('common.attributes.ended_at') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="cashier in cashiers" :key="cashier.id">
            <td>{{ cashier.id }}</td>
            <td>{{ cashier.cashier_group.label }}</td>
            <td>{{ cashier.enterprise?.name ?? 'Principale' }}</td>
            <td class="text-center">{{ cashier.name ?? '---' }}</td>
            <td>{{ date(cashier.start_at) }}</td>
            <td class="text-center">
              {{ cashier.ended_at ? date(cashier.ended_at) : '---' }}
            </td>
            <td>
              <button
                class="btn btn-secondary btn-xs"
                type="button"
                data-original-title="btn btn-secondary btn-xs"
                :title="$t('common.update')"
                @click.prevent="
                  $router.push({
                    name: 'sales.cashier.form',
                    params: { id: cashier.id },
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
                @click.prevent="deleteCashier(cashier)"
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
import filterMixin from '/@/mixins/FilterMixin.js';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  components: { BaseTableHeader, BaseContainer, BaseDatatable },
  mixins: [filterMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('cashier/getCashiersList', {
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
    ...mapGetters('cashier', ['cashiers', 'cashier']),
  },
  created() {
    if (this.cashier) this.$store.commit('cashier/SET_CURRENT_CASHIER', null);
  },
  methods: {
    deleteCashier(cashier) {
      if (confirm(this.$t('messages.confirmDelete', { label: cashier.label })))
        this.$store.dispatch('cashier/deleteCashier', cashier.id);
    },
  },
};
</script>

<style scoped></style>
