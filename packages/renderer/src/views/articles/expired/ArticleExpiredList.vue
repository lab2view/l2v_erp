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
              v-model="filterExpiredArticlesDate"
              :range="true"
              placeholder="Filtrer par date d'expiration ?"
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
              @click.prevent="
                filterStockByNumberOfDay(day.min_day, day.max_day)
              "
            >
              {{ day.label }}
            </a>
          </div>
        </div>

        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="ExpiredArticles.length"
        >
          <template #headers>
            <th>{{ $t('common.attributes.barcode') }}</th>
            <th>{{ $t('common.attributes.stock_entry_date') }}</th>
            <th>{{ $t('common.headers.stock_entry_qty') }}</th>
            <th>{{ $t('common.attributes.stock_expired') }}</th>
            <th>{{ $t('common.headers.stock_in') }}</th>
            <th>{{ $t('common.attributes.expiry_date') }}</th>
          </template>
          <tr
            v-for="ExpiredArticle in ExpiredArticles"
            :key="ExpiredArticle.article_id"
          >
            <td>
              {{ ExpiredArticle.product.code }}
            </td>
            <td>
              {{ $d(ExpiredArticle.entry_at, 'short') }}
            </td>
            <td>
              {{ ExpiredArticle.quantity }}
            </td>
            <td>{{ ExpiredArticle.remain_stock }}</td>
            <td>{{ ExpiredArticle.available_stock }}</td>
            <td>{{ $d(ExpiredArticle.expires_at, 'short') }}</td>
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
import { mapGetters } from 'vuex';
import BaseContainer from '/@/components/common/BaseContainer.vue';
import store from '/@/store/index.js';

export default {
  name: 'ArticleExpiredList',
  components: { BaseContainer, BaseDatetime, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('article/getExpiredArticlesList', {
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
    ...mapGetters('article', ['ExpiredArticles', 'requestField']),
    filterExpiredArticlesDate: {
      get() {
        const dates = this.requestField.expires_interval
          ? this.requestField.expires_interval.split(',')
          : null;
        return this.requestField.expires_at ?? dates;
      },
      set(date) {
        this.$store.commit('article/SET_REQUEST_FIELD_VALUE', {
          field: 'expires_at',
          value: date,
        });
        this.getFilterExpiredArticlesList();
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
    getFilterExpiredArticlesList() {
      if (!this.$store.state.globalLoading) {
        this.$store.commit('article/SET_REQUEST_FIELD_VALUE', {
          field: 'expires_interval',
          value: null,
        });
        this.$store.dispatch('setGlobalLoading', true);
        this.$store
          .dispatch('article/getExpiredArticlesList', {
            page: 1,
            field: { ...this.requestField, next: true },
          })
          .finally(() =>
            setTimeout(
              () => this.$store.dispatch('setGlobalLoading', false),
              1000
            )
          );
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

        this.$store.commit('article/SET_REQUEST_FIELD_VALUE', {
          field: 'expires_at',
          value: null,
        });

        this.$store.commit('article/SET_REQUEST_FIELD_VALUE', {
          field: 'expires_interval',
          value: `${day1},${day2}`,
        });
        this.$store.dispatch('article/getExpiredArticlesList', {
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
