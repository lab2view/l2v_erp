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
        <div class="col-md-12 row mb-2">
          <div>
            {{ $t('common.filter_interval') }}

            <a
              v-for="(day, index) in getDailyFilters"
              :key="`filter-${index}`"
              href="#"
              class="badge rounded-pill bg-primary"
              @click="filterStockByNumberOfDay(day.min_day, day.max_day)"
            >
              {{ day.label }}
            </a>
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
            :key="stockExpiredEntryLine.article_id"
          >
            <td>
              {{ stockExpiredEntryLine.article_id }}
            </td>
            <td>
              {{ stockExpiredEntryLine.article.name }}
            </td>
            <td>
              {{ stockExpiredEntryLine.article.product.code }} /
              {{ stockExpiredEntryLine.article.product.reference }}
            </td>
            <td>{{ stockExpiredEntryLine.article.product.reference }}</td>
            <td>{{ stockExpiredEntryLine.article.quantity }}</td>
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
        field: {
          expires_at: null,
        },
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
    getDailyFilters() {
      return [
        { label: 'Maintenant - 7 jours', min_day: null, max_day: 7 },
        { label: 'Interval 7 - 14 jours', min_day: 7, max_day: 14 },
        { label: 'Interval 14 - 21 jours', min_day: 14, max_day: 21 },
        { label: 'Interval 21 - 30 jours', min_day: 21, max_day: 30 },
      ];
    },
  },
  methods: {
    getFilterStockExpiredList() {
      if (!this.$store.state.globalLoading) {
        this.$store.commit('stock_entry_line/SET_REQUEST_FIELD_VALUE', {
          field: 'expires_interval',
          value: null,
        });
        this.$store.dispatch('stock_entry_line/getStockExpiredEntryLinesList', {
          page: 1,
          field: { ...this.requestField, next: true },
        });
        this.$store.dispatch('setGlobalLoading', true);
        setTimeout(() => this.$store.dispatch('setGlobalLoading', false), 2000);
      }
    },
    filterStockByNumberOfDay(min_day, max_day) {
      if (!this.$store.state.globalLoading) {
        let day1, day2;
        const today = new Date();
        if (!min_day) {
          day1 = today.toISOString(); // Convert today's date to ISO string format
          day2 = new Date(
            today.getTime() + max_day * 24 * 60 * 60 * 1000
          ).toISOString();
        } else {
          const startDate = new Date(
            today.getTime() + min_day * 24 * 60 * 60 * 1000
          );
          const endDate = new Date(
            today.getTime() + max_day * 24 * 60 * 60 * 1000
          );
          day1 = startDate.toISOString();
          day2 = endDate.toISOString();
        }

        this.$store.commit('stock_entry_line/SET_REQUEST_FIELD_VALUE', {
          field: 'expires_at',
          value: null,
        });

        this.$store.commit('stock_entry_line/SET_REQUEST_FIELD_VALUE', {
          field: 'expires_interval',
          value: `${day1},${day2}`,
        });
        this.$store.dispatch('stock_entry_line/getStockExpiredEntryLinesList', {
          page: 1,
          field: {
            ...this.requestField,
            next: true,
          },
        });
        this.$store.dispatch('setGlobalLoading', true);
        setTimeout(() => this.$store.dispatch('setGlobalLoading', false), 2000);
      }
    },
  },
};
</script>

<style scoped>
.badge:hover {
  color: white;
}
</style>
