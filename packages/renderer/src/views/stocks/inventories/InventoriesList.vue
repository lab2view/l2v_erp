<template>
  <BaseContainer
    :module="$t('menu.modules.stocks')"
    :title="$t('stocks.title')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('stocks.inventory.listTitle')"
        add-action-router-name="inventory.form.desc"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="inventory/getInventoriesList"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="inventories.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.reference') }}</th>
            <th>{{ $t('common.attributes.validate') }}</th>
            <th>{{ $t('common.attributes.inventory_date') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="inventory in inventories" :key="inventory.id">
            <td>{{ inventory.id }}</td>
            <td>{{ inventory.reference }}</td>
            <td>{{ inventory.validate }}</td>
            <td>{{ inventory.inventory_date }}</td>
            <td>
              <button
                :title="$t('common.update')"
                class="btn btn-secondary btn-xs"
                data-original-title="btn btn-secondary btn-xs"
                type="button"
                @click.prevent="
                  $router.push({
                    name: 'inventory.form.desc',
                    params: { id: inventory.id },
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
                @click.prevent="deleteInventory(inventory)"
              >
                <i class="fa fa-trash-o" />
              </button>
            </td>
          </tr>
        </BaseDatatable>
        <br />
      </div>

      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '/@/store/index.js';
import { mapGetters } from 'vuex';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  components: { BaseTableHeader, BaseContainer, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('inventory/getInventoriesList', {
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
    ...mapGetters('inventory', ['inventories', 'inventory']),
  },
  created() {
    if (this.inventory)
      this.$store.commit('inventory/SET_CURRENT_INVENTORY', null);
  },

  methods: {
    deleteInventory(inventory) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: inventory.reference })
        )
      )
        this.$store.dispatch('inventory/deleteInventory', inventory.id);
    },
  },
};
</script>

<style scoped></style>
