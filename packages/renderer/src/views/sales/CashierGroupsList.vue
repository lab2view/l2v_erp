<template>
  <BaseContainer
    :module="$t('menu.modules.sales')"
    :title="$t('sales.title')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('sales.cashierGroup.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'sales.cashier.group.form' }"
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
        <BaseDatatable :tfoot="false" :total="cashierGroups.length">
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
                    name: 'sales.cashierGroup.form',
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

export default {
  components: { BaseContainer, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('cashierGroup/getCashierGroupsList', {
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
    ...mapGetters('cashierGroup', ['cashierGroups', 'cashierGroup']),
  },
  created() {
    if (this.cashierGroup)
      this.$store.commit('cashierGroup/SET_CURRENT_CASHIER_GROUP', null);
  },

  methods: {
    deleteCashierGroup(cashierGroup) {
      if (confirm(this.$t('messages.confirmDelete', { label: cashierGroup.label })))
        this.$store.dispatch('cashierGroup/deleteCashierGroup', cashierGroup.id);
    },
  },
};
</script>

<style scoped></style>
