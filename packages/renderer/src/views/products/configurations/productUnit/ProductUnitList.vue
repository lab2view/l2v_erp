<template>
  <div class="card">
    <BaseTableHeader
      :title="$t('products.productUnit.listTitle')"
      add-action-router-name="config.products.productUnit.form"
      :refresh-action-field="{ page: 1, field: { next: true } }"
      refresh-action-name="product_unit/getProductUnitsList"
    />
    <div class="card-body">
      <BaseDatatable :tfoot="false">
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
            <button
              class="btn btn-secondary btn-xs"
              type="button"
              data-original-title="btn btn-secondary btn-xs"
              :title="$t('common.update')"
              @click.prevent="
                $router.push({
                  name: 'config.products.productUnit.form',
                  params: { id: productUnit.id },
                })
              "
            >
              {{ $t('common.update') }}
            </button>
            <button
              v-if="!productUnit.not_deletable"
              class="btn btn-danger btn-xs m-l-5"
              type="button"
              data-original-title="btn btn-danger btn-xs"
              :title="$t('common.delete')"
              @click.prevent="deleteProductUnit(productUnit)"
            >
              <i class="fa fa-trash-o" />
            </button>
          </td>
        </tr>
      </BaseDatatable>
    </div>

    <router-view />
  </div>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '../../../../store';
import { mapGetters } from 'vuex';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  components: { BaseTableHeader, BaseDatatable },
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
