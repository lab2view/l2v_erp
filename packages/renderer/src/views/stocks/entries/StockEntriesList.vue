<template>
  <div class="card">
    <div class="card-header pb-2 border-bottom border-bottom-">
      <div class="row align-items-center">
        <div class="col-sm">
          <h6>{{ $t('stock.stockEntry.list') }}</h6>
        </div>
        <div class="col-sm-auto align-items-end">
          <a
            href="#"
            class="btn btn-primary"
            type="button"
          >
            <i class="fa fa-save m-r-5" />
            {{ $t('stock.stockEntry.add') }}
          </a>
        </div>
      </div>
    </div>
    <div class="card-body pb-0">
      <BaseDatatable :tfoot="false" :total="stock_entries.length">
        <template #headers>
          <th>#</th>
          <th>{{ $t('common.attributes.stock_type') }}</th>
          <th>{{ $t('common.attributes.enterprise_sender') }}</th>
          <th>{{ $t('common.attributes.reference') }}</th>
          <th>{{ $t('common.attributes.availability') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </template>
        <tr v-for="stockEntry in stock_entries" :key="stockEntry.id">
          <td>{{ stockEntry.id }}</td>
          <td>{{ stockEntry.stock_type.label }}</td>
          <td>{{ stockEntry.enterprise_sender?.label }}</td>
          <td>{{ stockEntry.reference }}</td>
          <td>{{ stockEntry.availability }}</td>
          <td>
            <button
              v-if="!stockEntry.not_deletable"
              class="btn btn-danger btn-xs m-l-5"
              type="button"
              data-original-title="btn btn-danger btn-xs"
              :title="$t('common.delete')"
              @click.prevent="deleteStockEntry(stockEntry)"
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
      .dispatch('stock_entry/getStockEntriesList', {
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
    ...mapGetters('stock_entry', [
      'stock_entries',
    ]),
  },
  methods: {
    deleteStockEntry(stockEntry) {
      if (
        confirm(this.$t('messages.confirmDelete', { label: stockEntry.id }))
      ) {
        //     this.$store.dispatch(
        //       'stock_entry/deleteStockEntry',
        //       stockEntry.id
        //     );
        console.log('stockEntry', stockEntry);
      }
    },
  },
};
</script>

<style scoped></style>
