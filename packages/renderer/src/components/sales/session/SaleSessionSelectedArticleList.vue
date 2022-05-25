<template>
  <div class="col">
    <div class="card table-responsive" style="height: 37vh">
      <table class="table table-lg table-hover">
        <thead class="table-primary">
          <tr>
            <th>Articles</th>
            <th>Prix Unit</th>
            <th class="text-center" style="width: 220px">Qte</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody v-if="isCurrentSaleHaveArticle">
          <SelectedArticleLine
            v-for="article in stock_exit_lines"
            :key="`stock-exit-line-${article.id}`"
            :article="article"
          />
        </tbody>
      </table>
      <div
        v-if="!isCurrentSaleHaveArticle"
        class="card-body font-primary text-center"
      >
        {{ $t('common.no_article_in_list').toUpperCase() }}
      </div>
    </div>
  </div>
  <div class="col-auto">
    <BaseButton
      type="button"
      :text="$t('common.remove_all_in_list')"
      class="btn btn-outline-secondary"
      icon="fa fa-trash"
      :disabled="!isCurrentSaleHaveArticle"
      @click.prevent="resetArticles"
    />
  </div>
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';
import SelectedArticleLine from '/@/components/sales/session/SelectedArticleLine.vue';
export default {
  components: { SelectedArticleLine, BaseButton },
  computed: {
    ...mapGetters('cashier_session', [
      'stock_exit_lines',
      'isCurrentSaleHaveArticle',
    ]),
  },
  methods: {
    resetArticles() {
      this.$store.commit(
        'cashier_session/SET_CURRENT_SALE_REQUEST_ARTICLE_LINES',
        []
      );
      this.$store.commit('cashier_session/SET_CURRENT_SALE_REQUEST_FIELD', {
        value: null,
        field: 'cashin',
      });
    },
  },
};
</script>

<style scoped></style>
