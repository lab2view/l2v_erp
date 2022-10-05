<template>
  <div class="card">
    <BaseTableHeader
      :title="$t('products.productFamily.listTitle')"
      add-action-router-name="config.products.productFamily.form"
      :refresh-action-field="{ page: 1, field: { next: true } }"
      refresh-action-name="product_family/getProductFamiliesList"
    />
    <div class="card-body">
      <BaseDatatable :tfoot="false">
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
            <button
              class="btn btn-secondary btn-xs"
              type="button"
              data-original-title="btn btn-secondary btn-xs"
              :title="$t('common.update')"
              @click.prevent="
                $router.push({
                  name: 'config.products.productFamily.form',
                  params: { id: productFamily.id },
                })
              "
            >
              {{ $t('common.update') }}
            </button>
            <button
              v-if="!productFamily.not_deletable"
              class="btn btn-danger btn-xs m-l-5"
              type="button"
              data-original-title="btn btn-danger btn-xs"
              :title="$t('common.delete')"
              @click.prevent="deleteProductFamily(productFamily)"
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
