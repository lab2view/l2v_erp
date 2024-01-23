<template>
  <BaseModal modal-size="lg" :title="modalTitle">
    <div class="row align-items-center">
      <div class="col-md">
        <BaseRadioButton v-model="operator" :options="operators" />
        <div class="row align-items-center">
          <div class="col-md">
            <BaseFieldGroup
              :with-refresh="true"
              :with-append="false"
              refresh-action-name="enterprise/getEnterprisesList"
            >
              <BaseSelect
                v-model.number="filterDistribution"
                :options="distributions"
                key-label="name"
                key-value="id"
                :placeholder="`${$t('common.attributes.structure_all')} ?`"
              />
            </BaseFieldGroup>
          </div>
          <div class="col-md">
            <BaseInput
              v-model.number="filterQuantity"
              :placeholder="$t('common.attributes.stock_entry')"
              type="text"
              required
            />
          </div>
        </div>
      </div>
      <div class="col-md-auto">
        <BaseButton
          class="btn btn-sm btn-outline-primary"
          :text="$t('common.attributes.filter')"
          icon="fa fa-search"
          @click.prevent="getSaleArticleByWorkspaceStock"
        />
      </div>
    </div>
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
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'CashierSessionArticleFilter',
  components: {
    BaseSelect,
    BaseFieldGroup,
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
      filterDistribution: null,
    };
  },

  computed: {
    ...mapGetters('article', ['getArticleAvailableDistributions']),
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
          label: this.$t('sales.comparisons.greaterThan'),
          value: '>=',
        },
        {
          label: this.$t('sales.comparisons.lessThan'),
          value: '<=',
        },
        {
          label: this.$t('sales.comparisons.equalTo'),
          value: '===',
        },
      ];
    },
    distributions() {
      return this.getArticleAvailableDistributions.map(({ id, name }) => {
        return { name, id: id ?? '-1' };
      });
    },
  },
  methods: {
    getSaleArticleByWorkspaceStock() {
      this.$store.commit('SET_GLOBAL_LOADING', true);
      this.$store.commit('article/UPDATE_OPERATOR', this.operator);
      this.$store.commit(
        'article/UPDATE_DISTRIBUTION_ID',
        this.filterDistribution
      );
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
