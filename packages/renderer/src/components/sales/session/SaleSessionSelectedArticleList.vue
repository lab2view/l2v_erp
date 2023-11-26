<template>
  <div class="col">
    <div class="card table-responsive mb-0 pb-0" style="height: 36vh">
      <table ref="table" class="table table-lg table-hover">
        <thead class="table-primary">
          <tr>
            <th :class="tableTitleClass">
              Articles
              <span v-if="getCurrentSaleArticleCount > 0">
                ({{ getCurrentSaleArticleCount }})
              </span>
            </th>
            <th :class="tableTitleClass">Prix Unit</th>
            <th
              class="text-center"
              :class="tableTitleClass"
              :style="`width: ${saleScreenSmall ? 95 : 140}px`"
            >
              Qte
            </th>
            <th
              :class="tableTitleClass"
              :style="`width: ${saleScreenSmall ? 130 : 180}px`"
            >
              Total
            </th>
          </tr>
        </thead>
        <tbody v-if="isCurrentSaleHaveArticle">
          <SelectedArticleLine
            v-for="article in stock_exit_lines"
            :id="`art-id-${article.article_id}`"
            :key="`stock-exit-line-${article.article_id}`"
            :article="article"
            @updated="scrollToElement(`art-id-${article.article_id}`)"
            @delete="initArticleDeletion(article.article_id)"
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
    <ConfirmUserPin
      v-if="article_id || confirm_pin"
      @unlocked="confirm_pin ? resetCart() : removeArticle(article_id)"
      @cancel="cancelConfirmation"
    />
  </div>
  <div class="col-auto">
    <BaseButton
      type="button"
      :text="deleteListText"
      class="btn btn-outline-secondary"
      icon="fa fa-trash"
      :disabled="!isCurrentSaleHaveArticle"
      @click.prevent="initResetCart"
    />
  </div>
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';
import SelectedArticleLine from '/@/components/sales/session/SelectedArticleLine.vue';
import ConfirmUserPin from '/@/views/auth/ConfirmUserPin.vue';
export default {
  components: { ConfirmUserPin, SelectedArticleLine, BaseButton },
  data() {
    return {
      article_id: null,
      confirm_pin: false,
    };
  },
  computed: {
    ...mapGetters('cashier_session', [
      'stock_exit_lines',
      'isCurrentSaleHaveArticle',
      'getCurrentSaleArticleCount',
    ]),
    ...mapGetters('workspace', ['saleScreenSmall']),
    ...mapGetters('auth', ['currentUserHasConfirmationPin']),
    deleteListText() {
      return this.saleScreenSmall
        ? this.$t('common.remove_all_in_list_2')
        : this.$t('common.remove_all_in_list');
    },
    tableTitleClass() {
      return this.saleScreenSmall ? 'p-2' : '';
    },
  },
  methods: {
    scrollToElement(id) {
      const element = document.getElementById(id);
      element.scrollIntoView();
    },
    cancelConfirmation() {
      this.article_id = null;
      this.confirm_pin = false;
    },
    initArticleDeletion(article_id) {
      if (this.currentUserHasConfirmationPin) this.article_id = article_id;
      else this.removeArticle(article_id);
    },
    removeArticle(article_id) {
      this.$store.commit(
        'cashier_session/REMOVE_ARTICLE_TO_CURRENT_SALE_REQUEST',
        article_id
      );
      this.article_id = null;
    },
    initResetCart() {
      if (this.currentUserHasConfirmationPin) this.confirm_pin = true;
      else this.$store.commit('cashier_session/RESET_CURRENT_SALE_REQUEST');
    },
    resetCart() {
      this.$store.commit('cashier_session/RESET_CURRENT_SALE_REQUEST');
      this.confirm_pin = false;
    },
  },
};
</script>

<style scoped></style>
