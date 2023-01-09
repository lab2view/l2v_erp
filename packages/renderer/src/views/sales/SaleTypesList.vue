<template>
  <BaseContainer :module="$t('menu.modules.sales')" :title="$t('sales.title')">
    <div class="card">
      <BaseTableHeader
        :title="$t('sales.saleType.listTitle')"
        add-action-router-name="config.sales.sale.type.form"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="sale_type/getSaleTypesList"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="saleTypes.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="saleType in saleTypes" :key="saleType.id">
            <td>{{ saleType.id }}</td>
            <td>{{ saleType.label }}</td>
            <td>
              <BaseActionBtnGroup
                entity="SaleType"
                :with-show-btn="false"
                @update="
                  $router.push({
                    name: 'config.sales.sale.type.form',
                    params: { id: saleType.id },
                  })
                "
                @delete="deleteSaleType(saleType)"
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
import store from '/@/store';
import { mapGetters } from 'vuex';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';

export default {
  components: {
    BaseActionBtnGroup,
    BaseTableHeader,
    BaseContainer,
    BaseDatatable,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('sale_type/getSaleTypesList', {
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
    ...mapGetters('sale_type', ['saleTypes', 'saleType']),
  },
  created() {
    if (this.saleType)
      this.$store.commit('sale_type/SET_CURRENT_SALE_TYPE', null);
  },

  methods: {
    deleteSaleType(saleType) {
      if (confirm(this.$t('messages.confirmDelete', { label: saleType.label })))
        this.$store.dispatch('sale_type/deleteSaleType', saleType.id);
    },
  },
};
</script>

<style scoped></style>
