<template>
  <div class="card">
    <div class="card-header pb-2 border-bottom border-bottom-">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>{{ $t('product.productType.listTitle') }}</h5>
        </div>
        <div class="col-sm-auto align-items-end">
          <router-link
            :to="{ name: 'config.product.productType.form' }"
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
      <BaseDatatable :tfoot="false">
        <template #headers>
          <th>#</th>
          <th>{{ $t('common.attributes.product_family') }}</th>
          <th>{{ $t('common.attributes.label') }}</th>
          <th>{{ $t('common.attributes.description') }}</th>
          <th>{{ $t('common.attributes.stock_config') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </template>
        <tr v-for="productType in productTypes" :key="productType.id">
          <td>{{ productType.id }}</td>
          <td>{{ productType.product_family?.label ?? '--' }}</td>
          <td>{{ productType.label }}</td>
          <td>{{ productType.description }}</td>
          <td>
            <b>{{ $t('common.attributes.min') }}</b> :
            {{ productType.min_stock ?? '--' }}
            <br />
            <b>{{ $t('common.attributes.max') }}</b> :
            {{ productType.max_stock ?? '--' }}
            <br />
            <b>{{ $t('common.attributes.critical') }}</b> :
            {{ productType.critical_stock ?? '--' }}
            <br />
            <b>{{ $t('common.attributes.alert') }}</b> :
            {{ productType.alert_stock ?? '--' }}
          </td>
          <td>
            <button
              class="btn btn-secondary btn-xs"
              type="button"
              data-original-title="btn btn-secondary btn-xs"
              :title="$t('common.update')"
              @click.prevent="
                $router.push({
                  name: 'config.product.productType.form',
                  params: { id: productType.id },
                })
              "
            >
              {{ $t('common.update') }}
            </button>
            <button
              v-if="!productType.not_deletable"
              class="btn btn-danger btn-xs m-l-5"
              type="button"
              data-original-title="btn btn-danger btn-xs"
              :title="$t('common.delete')"
              @click.prevent="deleteProductType(productType)"
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

export default {
  components: { BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('product_type/getProductTypesList', {
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
    ...mapGetters('product_type', ['productTypes']),
  },
  methods: {
    deleteProductType(productType) {
      if (
        confirm(this.$t('messages.confirmDelete', { label: productType.label }))
      )
        this.$store.dispatch(
          'product_type/deleteProductType',
          productType.id
        );
    },
  },
};
</script>

<style scoped></style>
