<template>
  <BaseContainer :module="$t('menu.modules.sales')" :title="$t('sales.title')">
    <div class="card">
      <BaseTableHeader
        :title="$t('sales.sale.listTitle')"
        :refresh-action-field="{
          page: 1,
          field: { ...requestField, next: true },
        }"
        refresh-action-name="sale/getSalesList"
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
                :options="enterprises"
                v-model.number="enterpriseId"
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
              refresh-action-name="cashier/getCashiersList"
            >
              <BaseSelect
                :options="cashiers"
                v-model.number="cashierId"
                key-label="name"
                key-value="id"
                :placeholder="`${$t('common.attributes.cashier')} ?`"
              />
            </BaseFieldGroup>
          </div>
          <div class="col-md">
            <BaseFieldGroup
              :with-refresh="true"
              :with-append="false"
              refresh-action-name="sale_type/getSaleTypesList"
            >
              <BaseSelect
                :options="saleTypes"
                v-model.number="saleTypeId"
                key-label="label"
                key-value="id"
                :placeholder="`${$t('common.attributes.sale_type')} ?`"
              />
            </BaseFieldGroup>
          </div>
          <div class="col-md">
            <BaseDatetime
              placeholder="Filtrer par date ?"
              v-model="filterDate"
              :range="true"
              :maxDate="new Date()"
            />
          </div>
        </div>
        <SaleTable :sales="getSelectedSaleList" />
      </div>
      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import store from '/@/store/index.js';
import { mapGetters } from 'vuex';
import SaleTable from '/@/components/sales/SaleTable.vue';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import BaseDatetime from '/@/components/common/BaseDatetime.vue';

export default {
  name: 'SalesList',
  components: {
    BaseDatetime,
    BaseFieldGroup,
    BaseSelect,
    BaseTableHeader,
    SaleTable,
    BaseContainer,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('sale/getSalesList', { page: 1, field: {} }),
      store.dispatch('enterprise/getEnterprisesList', { page: 1, field: {} }),
      store.dispatch('cashier/getCashiersList', { page: 1, field: {} }),
      store.dispatch('sale_type/getSaleTypesList', { page: 1, field: {} }),
    ]).finally(() => next());
  },
  computed: {
    ...mapGetters('sale', ['getSelectedSaleList', 'requestField']),
    ...mapGetters('enterprise', ['enterprises']),
    ...mapGetters('cashier', ['cashiers']),
    ...mapGetters('sale_type', ['saleTypes']),

    enterpriseId: {
      get() {
        return this.requestField.enterprise_id;
      },
      set(id) {
        this.$store.commit('sale/SET_REQUEST_FIELD_VALUE', {
          field: 'enterprise_id',
          value: id,
        });
      },
    },
    cashierId: {
      get() {
        return this.requestField.cashier_id;
      },
      set(id) {
        this.$store.commit('sale/SET_REQUEST_FIELD_VALUE', {
          field: 'cashier_id',
          value: id,
        });
      },
    },
    saleTypeId: {
      get() {
        return this.requestField.sale_type_id;
      },
      set(id) {
        this.$store.commit('sale/SET_REQUEST_FIELD_VALUE', {
          field: 'sale_type_id',
          value: id,
        });
      },
    },
    filterDate: {
      get() {
        return this.requestField.created_at;
      },
      set(date) {
        this.$store.commit('sale/SET_REQUEST_FIELD_VALUE', {
          field: 'created_at',
          value: date,
        });
      },
    },
  },
  created() {
    this.$store.commit('sale/SET_REQUEST_FIELD_VALUE', {
      field: 'enterprise_id',
      value: null,
    });
    this.$store.commit('sale/SET_REQUEST_FIELD_VALUE', {
      field: 'cashier_id',
      value: null,
    });
    this.$store.commit('sale/SET_REQUEST_FIELD_VALUE', {
      field: 'sale_type_id',
      value: null,
    });
    this.$store.commit('sale/SET_REQUEST_FIELD_VALUE', {
      field: 'created_at',
      value: null,
    });
  },
};
</script>

<style scoped></style>
