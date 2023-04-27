<template>
  <BaseContainer
    :module="$t('menu.modules.stocks')"
    :title="$t('stocks.title')"
  >
    <div class="card">
      <div class="card-body">
        <div class="row mb-2 mt-2">
          <div class="col-md-4">
            <BaseDatetime
              v-model="filterStockExpiredDate"
              :max-date="new Date()"
              placeholder="Filtrer par date d'expiration ?"
            />
          </div>
          <div class="col-md text-end">
            <BaseButton
              type="button"
              class="btn btn-sm btn-primary m-r-20"
              icon="fa fa-filter"
              :text="$t('common.filter_list')"
              @click.prevent="getFilterStockExpiredList"
            />
          </div>
        </div>

        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="stockExpiredEntryLines.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.name') }}</th>
            <th>{{ $t('common.attributes.barcode') }}</th>
            <th>{{ $t('common.attributes.reference') }}</th>
            <th>{{ $t('common.attributes.quantity') }}</th>
            <th>{{ $t('common.attributes.expiry_date') }}</th>
          </template>
          <tr
            v-for="stockExpiredEntryLine in stockExpiredEntryLines"
            :key="stockExpiredEntryLine.id"
          >
            <td>
              {{ stockExpiredEntryLine.id }}
            </td>
            <td>
              {{ stockExpiredEntryLine.article.product.name }}
            </td>
            <td>
              {{ stockExpiredEntryLine.article.product.code }} /
              {{ stockExpiredEntryLine.article.product.reference }}
            </td>
            <td>{{ stockExpiredEntryLine.article.product.reference }}</td>
            <td>{{ stockExpiredEntryLine.quantity }}</td>
            <td>{{ $d(stockExpiredEntryLine.expires_at, 'short') }}</td>
          </tr>
        </BaseDatatable>
        <br />
      </div>
    </div>
  </BaseContainer>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import BaseDatetime from '/@/components/common/BaseDatetime.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';
import BaseContainer from '/@/components/common/BaseContainer.vue';
import store from '/@/store/index.js';

export default {
  name: 'StockExpiredEntriesLineList',
  components: { BaseContainer, BaseButton, BaseDatetime, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('stock_entry_line/getStockExpiredEntryLinesList', {
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
    ...mapGetters('stock_entry_line', [
      'stockExpiredEntryLines',
      'requestField',
    ]),
    filterStockExpiredDate: {
      get() {
        return this.requestField.expires_at;
      },
      set(date) {
        this.$store.commit('stock_entry_line/SET_REQUEST_FIELD_VALUE', {
          field: 'expires_at',
          value: date,
        });
      },
    },
  },
  methods: {
    getFilterStockExpiredList() {
      if (!this.$store.state.globalLoading) {
        this.$store.dispatch('stock_entry_line/getStockExpiredEntryLinesList', {
          page: 1,
          field: { ...this.requestField, next: true },
        });
        this.$store.dispatch('setGlobalLoading', true);
        setTimeout(() => this.$store.dispatch('setGlobalLoading', false), 2000);
      }
    },
  },
};
</script>

<style scoped></style>
