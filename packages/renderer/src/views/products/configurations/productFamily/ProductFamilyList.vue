<template>
  <div class="card">
    <BaseTableHeader
      :title="$t('products.productFamily.listTitle')"
      add-action-router-name="config.products.productFamily.form"
      :refresh-action-field="{ page: 1, field: { next: true } }"
      refresh-action-name="product_family/getProductFamiliesList"
      entity="ProductFamily"
    />
    <div class="card-body">
      <BaseDatatable v-if="!$store.state.globalLoading" :tfoot="false">
        <template #headers>
          <th>#</th>
          <th>{{ $t('common.attributes.label') }}</th>
          <th>{{ $t('common.attributes.description') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </template>
        <tr v-for="productFamily in productFamilies" :key="productFamily.id">
          <td>{{ productFamily.id }}</td>
          <td>{{ productFamily.label }}</td>
          <td>{{ productFamily.description }}</td>
          <td>
            <BaseActionBtnGroup
              entity="ProductFamily"
              :with-show-btn="false"
              :with-delete-btn="!productFamily.not_deletable"
              @update="
                $router.push({
                  name: 'config.products.productFamily.form',
                  params: { id: productFamily.id },
                })
              "
              @delete="deleteProductFamily(productFamily)"
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
  name: 'ProductFamilyList',
  components: { BaseActionBtnGroup, BaseTableHeader, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('product_family/getProductFamiliesList', {
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
    ...mapGetters('product_family', ['productFamilies']),
  },
  methods: {
    deleteProductFamily(productFamily) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: productFamily.label })
        )
      )
        this.$store.dispatch(
          'product_family/deleteProductFamily',
          productFamily.id
        );
    },
  },
};
</script>

<style scoped></style>
