<template>
  <div class="user-status table-responsive">
    <table class="table table-bordernone">
      <thead>
        <tr>
          <th scope="col">{{ $t('common.attributes.article_id') }}</th>
          <th scope="col" class="text-center">
            {{ $t('common.headers.stock_entry_qty') }}
          </th>
          <th scope="col" class="text-center">
            {{ $t('common.headers.stock_exit_qty') }}
          </th>
          <th scope="col" class="text-center">
            {{ $t('common.headers.stock_in') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <ArticleStockTableLine
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import ArticleStockTableLine from './ArticleStockTableLine.vue';
export default {
  name: 'ArticleStockTable',
  components: { ArticleStockTableLine },
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
