<template>
  <div class="card">
    <div class="card-header pb-2 border-bottom border-bottom-">
      <div class="row align-items-center">
        <div class="col-sm">
          <h6>{{ $t('stock.provision.list') }}</h6>
        </div>
        <div class="col-sm-auto align-items-end">
          <router-link
            :to="{ name: 'product.form.desc' }"
            href="#"
            class="btn btn-primary"
            type="button"
          >
            <i class="fa fa-save m-r-5" />
            {{ $t('stock.provision.add') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="card-body pb-0">
      <BaseDatatable :tfoot="false" :total="0">
        <template #headers>
          <th>#</th>
          <th>{{ $t('common.attributes.article_id') }}</th>
          <th>{{ $t('common.attributes.stock_entry_id') }}</th>
          <th>{{ $t('common.attributes.stock_entry_type_id') }}</th>
          <th>{{ $t('common.attributes.quantity') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </template>
        <tr v-for="stockProvision in stockProvisions" :key="stockProvision.id">
          <td>{{ stockProvision.id }}</td>
          <td>{{ stockProvision.article.name }}</td>
          <td>{{ stockProvision.stock_entry.reference }}</td>
          <td>{{ stockProvision.stock_entry.stock_type.label }}</td>
          <td>{{ stockProvision.quantity }}</td>
          <td>
            <button
              class="btn btn-secondary btn-xs"
              type="button"
              data-original-title="btn btn-secondary btn-xs"
              :title="$t('common.update')"
              @click.prevent="
                $router.push({
                  name: 'product.form.desc',
                  params: { id: stockProvision.id },
                })
              "
            >
              {{ $t('common.update') }}
            </button>
            <button
              v-if="!stockProvision.not_deletable"
              class="btn btn-danger btn-xs m-l-5"
              type="button"
              data-original-title="btn btn-danger btn-xs"
              :title="$t('common.delete')"
              @click.prevent="deleteStockProvision(stockProvision)"
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
import BaseDatatable from '../../../components/common/BaseDatatable.vue';
import store from '../../../store';
import { mapGetters } from 'vuex';
export default {
  components: { BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('stock_provision/getStockProvisionsList', {
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
  props: {
    useCurrentProduct: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters('stock_provision', [
      'stock_provisions',
      'getStockProvisionByProductId',
    ]),
    ...mapGetters('product', ['product']),
    stockProvisions() {
      return this.useCurrentProduct
        ? this.getStockProvisionByProductId(this.product.id)
        : this.stock_provisions;
    },
  },
  methods: {
    deleteStockProvision(stockProvision) {
      if (
        confirm(this.$t('messages.confirmDelete', { label: stockProvision.id }))
      )
        this.$store.dispatch(
          'stock_provision/deleteStockProvision',
          stockProvision.id
        );
    },
  },
};
</script>

<style scoped></style>
