<template>
  <BaseContainer
    :module="$t('menu.modules.stocks')"
    :title="$t('stocks.title')"
  >
    <form @submit.prevent="processToStockCrossing">
      <div class="col-md-12 project-list">
        <div class="card p-0">
          <div class="row align-items-center">
            <div class="col-md p-0">
              <div class="nav nav-tabs border-tab mb-0">
                <div class="col-md m-r-5">
                  <BaseFieldGroup
                    :with-refresh="true"
                    :with-append="false"
                    refresh-action-name="enterprise/getEnterprisesList"
                    :label="$t('common.fields.enterprise_from')"
                  >
                    <BaseSelect
                      v-model.number="crossingField.source_enterprise_id"
                      :options="sourceEnterprises"
                      key-label="name"
                      key-value="id"
                    />
                  </BaseFieldGroup>
                </div>
                <div class="col-md m-r-5">
                  <BaseSelect
                    v-model.number="crossingField.target_enterprise_id"
                    :label="$t('common.fields.enterprise_to')"
                    :options="targetEnterprises"
                    required
                    key-label="name"
                    key-value="id"
                  />
                </div>
                <div class="col-md">
                  <BaseInput
                    v-model.number="crossingField.quantity"
                    :label="$t('common.fields.stock_level')"
                    placeholder="Quantity"
                    type="number"
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="col-md-auto">
              <div class="form-group mb-0 me-0"></div>
              <BaseButton
                icon="fa fa-exchange"
                :text="$t('common.make_crossing')"
                type="submit"
                class="btn btn-sm btn-primary"
                :loading="loading"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="card">
      <BaseTableHeader
        :title="$t('stocks.crossing.listTitle')"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="article/getArticlesList"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!loading"
          :buttons="datatableButtons"
          :total="articlesCrossings.length"
        >
          <template #headers>
            <th class="text-start">{{ $t('common.attributes.article_id') }}</th>
            <th class="text-center">{{ sourceEntTableHeaderName }}</th>
            <th class="text-center">{{ targetEntTableHeaderName }}</th>
          </template>
          <tr
            v-for="article in articlesCrossings"
            :key="`art-crossing-${article.id}`"
          >
            <td class="text-start">{{ article.articleName }}</td>
            <td class="text-center">
              {{ `${article.sourceStock} ${article.unitName}` }}
            </td>
            <td class="text-center">
              {{ `${article.targetStock} ${article.unitName}` }}
            </td>
          </tr>
        </BaseDatatable>
      </div>
      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import StockExitTable from '/@/components/stocks/StockExitTable.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import { datatableBtnCode } from '/@/helpers/codes.js';

export default {
  name: 'StockCrossings',
  components: {
    BaseDatatable,
    BaseInput,
    BaseFieldGroup,
    BaseSelect,
    BaseButton,
    BaseTableHeader,
    StockExitTable,
    BaseContainer,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('enterprise/getEnterprisesList', {
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
  data() {
    return {
      loading: false,
      crossingField: {
        source_enterprise_id: null,
        target_enterprise_id: null,
        quantity: null,
      },
      articlesCrossings: [],
    };
  },
  computed: {
    ...mapGetters('enterprise', ['enterprises']),
    sourceEnterprises() {
      return [
        { id: '', name: this.$t('common.parent') },
        ...this.enterprises.filter(
          (ent) => ent.id !== this.crossingField.target_enterprise_id
        ),
      ];
    },
    targetEnterprises() {
      return this.enterprises.filter(
        (ent) => ent.id !== this.crossingField.source_enterprise_id
      );
    },
    sourceEntName() {
      return (
        this.enterprises.find(
          (ent) => ent.id === this.crossingField.source_enterprise_id
        )?.name ?? 'Principal'
      );
    },
    targetEntName() {
      return (
        this.enterprises.find(
          (ent) => ent.id === this.crossingField.target_enterprise_id
        )?.name ?? 'Principal'
      );
    },
    sourceEntTableHeaderName() {
      return `${this.$t('common.headers.stock_in')} << ${
        this.sourceEntName
      } >>`;
    },
    targetEntTableHeaderName() {
      return `${this.$t('common.headers.stock_in')} << ${
        this.targetEntName
      } >>`;
    },
    datatableButtons() {
      return [
        datatableBtnCode.excel,
        datatableBtnCode.csv,
        {
          extend: datatableBtnCode.pdf,
          messageTop: this.$t('stocks.crossing.reportTitle', {
            date: this.$d(new Date(), 'date'),
            time: this.$d(new Date(), 'time'),
            source: this.sourceEntName,
            target: this.targetEntName,
            level: this.crossingField.quantity,
          }),
        },
      ];
    },
  },

  methods: {
    processToStockCrossing() {
      this.loading = true;
      setTimeout(
        () =>
          this.$store
            .dispatch('article/getArticleByStockCrossing', {
              ...this.crossingField,
            })
            .then((data) => (this.articlesCrossings = data))
            .finally(() => (this.loading = false)),
        2000
      );
    },
  },
};
</script>

<style scoped></style>
