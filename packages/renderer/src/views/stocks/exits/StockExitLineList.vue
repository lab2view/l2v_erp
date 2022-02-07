<template>
  <div class="card">
    <div class="card-header pb-2 border-bottom border-bottom-">
      <div class="row align-items-center">
        <div class="col-sm">
          <h6>{{ $t('stock.exitLine.list') }}</h6>
        </div>
        <div class="col-sm-auto align-items-end">
          <router-link
            :to="{ name: 'product.form.desc' }"
            href="#"
            class="btn btn-primary"
            type="button"
          >
            <i class="fa fa-save m-r-5" />
            {{ $t('stock.exitLine.add') }}
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
        <tr v-for="stockExitLine in stockExitLines" :key="stockExitLine.id">
          <td>{{ stockExitLine.id }}</td>
          <td>{{ stockExitLine.article.name }}</td>
          <td>{{ stockExitLine.stock_exit.reference }}</td>
          <td>{{ stockExitLine.stock_exit.stock_type.label }}</td>
          <td>{{ stockExitLine.quantity }}</td>
          <td>
            <button
              class="btn btn-secondary btn-xs"
              type="button"
              data-original-title="btn btn-secondary btn-xs"
              :title="$t('common.update')"
              @click.prevent="
                $router.push({
                  name: 'product.form.desc',
                  params: { id: stockExitLine.id },
                })
              "
            >
              {{ $t('common.update') }}
            </button>
            <button
              v-if="!stockExitLine.not_deletable"
              class="btn btn-danger btn-xs m-l-5"
              type="button"
              data-original-title="btn btn-danger btn-xs"
              :title="$t('common.delete')"
              @click.prevent="deleteStockExitLine(stockExitLine)"
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
      .dispatch('stock_exit_line/getStockExitLineList', {
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
    ...mapGetters('stock_exit_line', [
      'stock_exit_lines',
      'getStockExitLineByProductId',
    ]),
    ...mapGetters('product', ['product']),
    stockExitLines() {
      return this.useCurrentProduct
        ? this.getStockExitLineByProductId(this.product.id)
        : this.stock_exit_lines;
    },
  },
  methods: {
    deleteStockExitLine(stockExitLine) {
      if (
        confirm(this.$t('messages.confirmDelete', { label: stockExitLine.id }))
      )
        this.$store.dispatch(
          'stock_exit_line/deleteStockExitLine',
          stockExitLine.id
        );
    },
  },
};
</script>

<style scoped></style>
