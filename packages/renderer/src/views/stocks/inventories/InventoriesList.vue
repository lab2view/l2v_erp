<template>
  <BaseContainer
    :module="$t('menu.modules.stocks')"
    :title="$t('stocks.title')"
  >
    <div class="card">
      <BaseTableHeader
        :refresh-action-field="{
          page: 1,
          field: { ...requestField, next: true },
        }"
        :title="$t('stocks.inventory.listTitle')"
        add-action-router-name="inventory.form.desc"
        refresh-action-name="inventory/getInventoriesList"
        entity="Inventory"
      />
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <BaseDatetime
              v-model="filterDate"
              :max-date="new Date()"
              :range="true"
              placeholder="Filtrer par date ?"
            />
          </div>
        </div>
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="inventories.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.structure') }}</th>
            <th>{{ $t('common.attributes.reference') }}</th>
            <th>{{ $t('common.attributes.validate') }}</th>
            <th>{{ $t('common.attributes.inventory_date') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="inventory in inventories" :key="inventory.id">
            <td>{{ inventory.id }}</td>
            <td>{{ inventory.enterprise?.name || 'Principal' }}</td>
            <td>{{ inventory.reference }}</td>
            <td>
              {{ inventory.validate ? $t('common.yes') : $t('common.no') }}
            </td>
            <td>{{ $d(inventory.inventory_date, 'short') }}</td>
            <td>
              <BaseActionBtnGroup
                entity="Inventory"
                :with-show-btn="inventory.validate"
                :with-update-btn="!inventory.validate"
                :with-delete-btn="!inventory.stock_balancing"
                @show="
                  $router.push({
                    name: `inventory.form.article`,
                    params: { id: inventory.id },
                  })
                "
                @update="
                  $router.push({
                    name: `inventory.form.desc`,
                    params: { id: inventory.id },
                  })
                "
                @delete="deleteInventory(inventory)"
              />
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
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseDatetime from '/@/components/common/BaseDatetime.vue';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';
export default {
  name: 'InventoriesList',
  components: {
    BaseActionBtnGroup,
    BaseButton,
    BaseTableHeader,
    BaseContainer,
    BaseDatatable,
    BaseDatetime,
  },
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
    ...mapGetters('inventory', ['inventories', 'inventory', 'requestField']),
    filterDate: {
      get() {
        return this.requestField.created_at;
      },
      set(date) {
        this.$store.commit('inventory/SET_REQUEST_FIELD_VALUE', {
          field: 'created_at',
          value: date,
        });
      },
    },
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
