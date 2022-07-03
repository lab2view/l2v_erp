<template>
  <BaseContainer :module="$t('menu.modules.sales')" :title="$t('sales.title')">
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('sales.cashier.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'sales.cashier.form' }"
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
        <BaseDatatable :tfoot="false" :total="cashiers.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.cashier_group') }}</th>
            <th>{{ $t('common.attributes.structure') }}</th>
            <th class="text-center">
              {{ $t('common.attributes.first_name') }}
            </th>
            <th>{{ $t('common.attributes.start_at') }}</th>
            <th>{{ $t('common.attributes.ended_at') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="cashier in cashiers" :key="cashier.id">
            <td>{{ cashier.id }}</td>
            <td>{{ cashier.cashier_group.label }}</td>
            <td>{{ cashier.enterprise?.name ?? 'Principale' }}</td>
            <td class="text-center">{{ cashier.name ?? '-' }}</td>
            <td>{{ date(cashier.start_at) }}</td>
            <td>{{ cashier.ended_at ? date(cashier.ended_at) : '-' }}</td>
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

export default {
  components: { BaseContainer, BaseDatatable },
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
