<template>
  <div class="col">
    <div class="card table-responsive mb-0 pb-0" style="height: 36vh">
      <table class="table table-lg table-hover">
        <thead class="table-primary">
          <tr>
            <th>
              Articles
              <span v-if="getCurrentSaleArticleCount > 0">
                ({{ getCurrentSaleArticleCount }})
              </span>
            </th>
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
      :text="deleteListText"
      class="btn btn-outline-secondary"
      icon="fa fa-trash"
      :disabled="!isCurrentSaleHaveArticle"
      @click.prevent="
        $store.commit('cashier_session/RESET_CURRENT_SALE_REQUEST')
      "
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
      'getCurrentSaleArticleCount',
    ]),
    ...mapGetters('workspace', ['isEscaleMarketWorkspace']),
    deleteListText() {
      return this.isEscaleMarketWorkspace
        ? this.$t('common.remove_all_in_list_2')
        : this.$t('common.remove_all_in_list');
    },
  },
};
</script>

<style scoped></style>
