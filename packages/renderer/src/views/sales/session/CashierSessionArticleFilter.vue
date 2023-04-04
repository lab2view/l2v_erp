<template>
  <BaseModal modal-size="lg" :title="modalTitle">
    <BaseRadioButton v-model="operator" :options="operators" />
    <BaseInput
      v-model.number="filterQuantity"
      :placeholder="$t('common.attributes.stock_entry')"
      type="text"
      required
      @keydown.enter="getSaleArticleByWorkspaceStock"
    />
    <div class="card-body p-1">
      <div class="vertical-scroll scroll-demo m-0 p-0">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="articles.length"
          :buttons="datatableButtons"
        >
          <template #headers>
            <th>{{ $t('common.headers.images') }}</th>
            <th>{{ $t('common.attributes.name') }}</th>
            <th class="text-center">{{ $t('common.headers.stock_in') }}</th>
          </template>

          <tr v-for="article in articles" :key="article.id">
            <td>
              <a
                href="#"
                @click.prevent="
                  $router.push({
                    name: 'sales.session.picture',
                    params: { article_id: article.id },
                  })
                "
              >
                <img
                  v-if="article.cover_thumb_url"
                  class="img-auto"
                  :src="article.cover_thumb_url"
                  :alt="article.article_id"
                  :title="article.name"
                />
              </a>
            </td>
            <td>{{ article.name }}</td>
            <td>{{ article.workspace_stock }}</td>
          </tr>
        </BaseDatatable>
      </div>
    </div>
    <template #footer>
      <BaseButton
        :title="$t('common.close')"
        class="btn btn-sm btn-secondary"
        type="button"
        :text="$t('common.close')"
        @click.prevent="$router.back()"
      />
    </template>
  </BaseModal>
</template>

<script>
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseModal from '/@/components/common/BaseModal.vue';
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import { datatableBtnCode } from '/@/helpers/codes';
import BaseRadioButton from '/@/components/common/BaseRadioButton.vue';

export default {
  name: 'CashierSessionDiscountVerify',
  components: {
    BaseRadioButton,
    BaseDatatable,
    BaseModal,
    BaseButton,
    BaseInput,
  },
  data() {
    return {
      filterQuantity: null,
      articles: [],
      operator: '>=',
    };
  },

  computed: {
    modalTitle() {
      return this.articles.length > 0
        ? this.$t('common.article_list_by_stock', {
            stock: this.filterQuantity,
            operator: this.operator,
          })
        : this.$t('common.filter_article_by_stock');
    },
    datatableButtons() {
      return [
        {
          extend: datatableBtnCode.pdf,
          messageTop: this.modalTitle,
        },
      ];
    },
    operators() {
      return [
        {
          label: 'Greater than or equal to',
          value: '>=',
        },
        {
          label: 'Less than or equal to',
          value: '<=',
        },
        {
          label: 'Equal to',
          value: '===',
        },
      ];
    },
  },
  methods: {
    getSaleArticleByWorkspaceStock() {
      this.$store.commit('SET_GLOBAL_LOADING', true);
      this.$store.commit('article/UPDATE_OPERATOR', this.operator);
      this.articles = [];
      this.$store
        .dispatch('article/getSaleArticleByWorkspaceStock', this.filterQuantity)
        .then((data) => (this.articles = data))
        .finally(() => {
          setTimeout(
            () => this.$store.commit('SET_GLOBAL_LOADING', false),
            2000
          );
        });
    },
  },
};
</script>

<style scoped>
.img-auto {
  width: auto !important;
  height: auto;
}
</style>
