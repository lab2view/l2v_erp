<template>
  <div class="card">
    <BaseTableHeader
      :title="$t('products.productUnit.listTitle')"
      add-action-router-name="config.products.productUnit.form"
      :refresh-action-field="{ page: 1, field: { next: true } }"
      refresh-action-name="product_unit/getProductUnitsList"
      entity="ProductUnit"
    />
    <div class="card-body">
      <BaseDatatable v-if="!$store.state.globalLoading" :tfoot="false">
        <template #headers>
          <th>#</th>
          <th>{{ $t('common.attributes.code') }}</th>
          <th>{{ $t('common.attributes.label') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </template>
        <tr v-for="productUnit in productUnits" :key="productUnit.id">
          <td>{{ productUnit.id }}</td>
          <td>{{ productUnit.code }}</td>
          <td>{{ productUnit.label }}</td>
          <td>
            <BaseActionBtnGroup
              entity="ProductUnit"
              :with-show-btn="false"
              :with-delete-btn="!productUnit.not_deletable"
              @update="
                $router.push({
                  name: 'config.products.productUnit.form',
                  params: { id: productUnit.id },
                })
              "
              @delete="deleteProductUnit(productUnit)"
            />
          </td>
        </tr>
      </BaseDatatable>
    </div>

    <router-view />
  </div>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';

export default {
  name: 'ProductUnit',
  components: { BaseActionBtnGroup, BaseTableHeader, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('product_unit/getProductUnitsList', {
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
    ...mapGetters('product_unit', ['productUnits']),
  },
  methods: {
    deleteProductUnit(productUnit) {
      if (
        confirm(this.$t('messages.confirmDelete', { label: productUnit.label }))
      )
        this.$store.dispatch('product_unit/deleteProductUnit', productUnit.id);
    },
  },
};
</script>

<style scoped></style>
