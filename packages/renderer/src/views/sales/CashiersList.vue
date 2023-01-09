<template>
  <BaseContainer :module="$t('menu.modules.sales')" :title="$t('sales.title')">
    <div class="card">
      <BaseTableHeader
        :title="$t('sales.cashier.listTitle')"
        add-action-router-name="sales.cashier.form"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="cashier/getCashiersList"
        entity="Cashier"
      />
      <div class="card-body p-1">
        <div class="row mb-2">
          <div class="col-md-3">
            <BaseFieldGroup
              :with-refresh="true"
              refresh-action-name="enterprise/getEnterprisesList"
              :with-append="false"
            >
              <BaseSelect
                v-model.number="cashierFilter.enterprise_id"
                :options="enterprises"
                key-label="name"
                key-value="id"
              />
            </BaseFieldGroup>
          </div>
          <div class="col-md-3">
            <BaseFieldGroup
              :with-refresh="true"
              refresh-action-name="cashier_group/getCashierGroupsList"
              :with-append="false"
            >
              <BaseSelect
                v-model.number="cashierFilter.cashier_group_id"
                :options="cashierGroups"
                key-label="label"
                key-value="id"
              />
            </BaseFieldGroup>
          </div>
        </div>

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
              <BaseActionBtnGroup
                entity="Cashier"
                :with-show-btn="false"
                @update="
                  $router.push({
                    name: 'sales.cashier.form',
                    params: { id: cashier.id },
                  })
                "
                @delete="deleteCashier(cashier)"
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
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';
import filterMixin from '/@/mixins/FilterMixin';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';

export default {
  name: 'CashiersList',
  components: {
    BaseActionBtnGroup,
    BaseFieldGroup,
    BaseSelect,
    BaseTableHeader,
    BaseContainer,
    BaseDatatable,
  },
  mixins: [filterMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('cashier/getCashiersList', {
        page: 1,
        field: {},
      }),
      store.dispatch('cashier_group/getCashierGroupsList', {
        page: 1,
        field: {},
      }),
      store.dispatch('enterprise/getEnterprisesList', {
        page: 1,
        field: {},
      }),
    ])
      .then(() => {
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  data() {
    return {
      cashierFilter: {
        enterprise_id: null,
        cashier_group_id: null,
      },
    };
  },
  computed: {
    ...mapGetters('cashier', ['getCashiersByFilter', 'cashier']),
    ...mapGetters('enterprise', ['enterprises']),
    ...mapGetters('cashier_group', ['cashierGroups']),
    cashiers() {
      return this.getCashiersByFilter(this.cashierFilter);
    },
  },
  watch: {
    cashiers() {
      if (!this.$store.state.globalLoading) {
        this.$store.dispatch('setGlobalLoading', true);
        setTimeout(() => this.$store.dispatch('setGlobalLoading', false), 2000);
      }
    },
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
