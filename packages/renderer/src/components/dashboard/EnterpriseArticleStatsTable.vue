<template>
  <div class="user-status table-responsive">
    <table class="table table-bordernone">
      <thead>
        <tr>
          <th scope="col">
            {{ $t('products.productType.listTitle') }}
          </th>
          <th class="text-center" scope="col">
            {{ $t('common.headers.stock_in') }}
          </th>
          <th class="text-center" scope="col">
            {{ $t('common.headers.total_buying') }}
          </th>
          <th class="text-center" scope="col">
            {{ $t('common.headers.total_price') }}
          </th>
          <th class="text-center" scope="col">
            {{ $t('common.headers.win_amount') }}
          </th>
          <th class="text-end" scope="col">
            {{ $t('common.attributes.state') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <EnterpriseArticleStatTableLine
          :state="stat"
          v-for="(stat, index) in articleStats"
          :key="`stat-fam-${index}`"
          :currency="currency"
          :total-article-stock="totalArticleStock"
        />
      </tbody>
      <tfoot>
        <tr>
          <th>{{ $t('common.headers.total') }}</th>
          <th class="text-center">{{ statTotal.quantity }}</th>
          <th class="text-center">
            {{ `${statTotal.total_buying} ${currency}` }}
          </th>
          <th class="text-center">
            {{ `${statTotal.total_selling} ${currency}` }}
          </th>
          <th class="text-center">
            {{
              `${statTotal.total_selling - statTotal.total_buying} ${currency}`
            }}
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import EnterpriseArticleStatTableLine from '/@/components/dashboard/EnterpriseArticleStatTableLine.vue';
import { sumBy } from 'lodash';

export default {
  name: 'EnterpriseArticleStatsTable',
  components: { EnterpriseArticleStatTableLine },
  props: {
    articleStats: {
      type: Array,
      required: true,
    },
    totalArticleStock: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: null,
    },
  },
  computed: {
    statTotal() {
      return {
        quantity: sumBy(this.articleStats, 'total'),
        total_selling: sumBy(this.articleStats, 'total_price'),
        total_buying: sumBy(this.articleStats, 'total_buying_price'),
      };
    },
  },
};
</script>

<style scoped></style>
