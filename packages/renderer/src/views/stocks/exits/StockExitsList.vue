<template>
  <BaseContainer
    :module="$t('menu.modules.stocks')"
    :title="$t('stocks.title')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('stocks.stockExit.listTitle')"
        add-action-router-name="stocks.exit.form.desc"
        :refresh-action-field="{
          page: 1,
          field: { ...requestField, next: true },
        }"
        refresh-action-name="stock_exit/getStockExitsList"
        add-action-label="stocks.stockExit.add"
      />
      <div class="card-body p-1">
        <div class="row mb-2 justify-content-center">
          <div class="col-md">
            <BaseFieldGroup
              :with-refresh="true"
              :with-append="false"
              refresh-action-name="enterprise/getEnterprisesList"
            >
              <BaseSelect
                v-model.number="enterpriseId"
                :options="enterprises"
                key-label="name"
                key-value="id"
                :placeholder="`${$t('common.attributes.structure')} ?`"
              />
            </BaseFieldGroup>
          </div>
          <div class="col-md">
            <BaseFieldGroup
              :with-refresh="true"
              :with-append="false"
              refresh-action-name="stock_type/getStockTypesList"
            >
              <BaseSelect
                v-model.number="stockTypeId"
                :options="stockTypes"
                key-label="label"
                key-value="id"
                :placeholder="`${$t('common.attributes.stock_type')} ?`"
              />
            </BaseFieldGroup>
          </div>
          <div class="col-md">
            <BaseFieldGroup
              :with-refresh="true"
              :with-append="false"
              refresh-action-name="stock_state/getStockStatesList"
            >
              <BaseSelect
                v-model.number="stockStateId"
                :options="stockStates"
                key-label="label"
                key-value="id"
                :placeholder="`${$t('common.attributes.stock_state')} ?`"
              />
            </BaseFieldGroup>
          </div>
          <div class="col-md">
            <BaseDatetime
              v-model="filterDate"
              placeholder="Filtrer par date ?"
              :range="true"
              :max-date="new Date()"
            />
          </div>
        </div>
        <StockExitTable :stock-exits="stock_exits" />
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
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { stockFor, stockTypeCode } from '/@/helpers/codes.js';
import BaseDatetime from '/@/components/common/BaseDatetime.vue';

export default {
  name: 'StockExitsList',
  components: {
    BaseDatetime,
    BaseSelect,
    BaseFieldGroup,
    BaseTableHeader,
    StockExitTable,
    BaseContainer,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('stock_exit/getStockExitsList', { page: 1, field: {} }),
      store.dispatch('enterprise/getEnterprisesList', { page: 1, field: {} }),
      store.dispatch('stock_type/getStockTypesList', { page: 1, field: {} }),
      store.dispatch('stock_state/getStockStatesList', { page: 1, field: {} }),
    ])
      .then(() => {
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  computed: {
    ...mapGetters('stock_exit', ['stock_exits', 'requestField']),
    ...mapGetters('enterprise', ['enterprises']),
    ...mapGetters('stock_type', ['getListByTypeFor']),
    ...mapGetters('stock_state', ['getListByStateFor']),
    stockTypes() {
      return this.getListByTypeFor(stockFor.exit).filter(
        (type) => type.code !== stockTypeCode.sale
      );
    },
    stockStates() {
      return this.getListByStateFor(stockFor.exit);
    },
    enterpriseId: {
      get() {
        return this.requestField.enterprise_id;
      },
      set(id) {
        this.$store.commit('stock_exit/SET_REQUEST_FIELD_VALUE', {
          field: 'enterprise_id',
          value: id,
        });
      },
    },
    stockTypeId: {
      get() {
        return this.requestField.stock_type_id;
      },
      set(id) {
        this.$store.commit('stock_exit/SET_REQUEST_FIELD_VALUE', {
          field: 'stock_type_id',
          value: id,
        });
      },
    },
    stockStateId: {
      get() {
        return this.requestField.stock_state_id;
      },
      set(id) {
        this.$store.commit('stock_exit/SET_REQUEST_FIELD_VALUE', {
          field: 'stock_state_id',
          value: id,
        });
      },
    },
    filterDate: {
      get() {
        return this.requestField.created_at;
      },
      set(date) {
        this.$store.commit('stock_exit/SET_REQUEST_FIELD_VALUE', {
          field: 'created_at',
          value: date,
        });
      },
    },
  },
};
</script>

<style scoped></style>
