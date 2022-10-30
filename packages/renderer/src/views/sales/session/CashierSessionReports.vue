<template>
  <BaseModal
    :title="`${$t('sales.session.close_title', {
      cashRegister: cashRegisterName,
      date: $d(sessionSaleReportDate, 'date'),
    })}`"
    modal-size="xl"
    modal-body-class="pb-0 pt-0 p-l-5 p-r-5"
    :show-footer="false"
  >
    <div class="row justify-content-center mb-2 mt-2">
      <div class="col-md">
        <BaseFieldGroup
          :with-refresh="true"
          :with-append="false"
          refresh-action-name="sale_type/getSaleTypesList"
        >
          <BaseSelect
            v-model.number="saleTypeId"
            :options="saleTypes"
            key-label="label"
            key-value="id"
            :placeholder="`${$t('common.attributes.sale_type')} ?`"
          />
        </BaseFieldGroup>
      </div>
      <div class="col-md">
        <BaseDatetime
          v-model="filterDate"
          placeholder="Filtrer par date ?"
          :max-date="new Date()"
        />
      </div>
      <div class="col-md text-end">
        <BaseButton
          type="button"
          :loading="loading"
          class="btn btn-sm btn-primary m-r-20"
          icon="fa fa-filter"
          :text="$t('common.filter_list')"
          @click.prevent="getFilterSalesList"
        />
      </div>
    </div>
    <div v-if="getSelectedSaleList.length" class="card-body p-0 mb-2">
      <SaleTable :sales="getSelectedSaleList" :is-cashier-session="true" />
    </div>
    <div v-else class="card-body">
      <h6 class="f-w-300">{{ $t('sales.session.no_sale').toUpperCase() }}</h6>
    </div>

    <router-view />
  </BaseModal>
</template>

<script>
import BaseModal from '/@/components/common/BaseModal.vue';
import store from '/@/store/index';
import { mapGetters } from 'vuex';
import SaleSessionMixin from '/@/mixins/SaleSessionMixin';
import SaleTable from '/@/components/sales/SaleTable.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseDatetime from '/@/components/common/BaseDatetime.vue';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  name: 'CashierSessionReports',
  components: {
    BaseButton,
    BaseDatetime,
    BaseSelect,
    BaseFieldGroup,
    SaleTable,
    BaseModal,
  },
  mixins: [SaleSessionMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    const cashier_id =
      store.getters['cashier_session/currentSession'].cashier_id;
    store
      .dispatch('sale/getSalesList', {
        page: 1,
        field: {
          cashier_id,
          created_at: null,
          next: true,
        },
      })
      .finally(() => next());
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters('sale', ['requestField', 'getSelectedSaleList']),
    ...mapGetters('sale_type', ['saleTypes']),
    sessionSaleReportDate() {
      return this.requestField.created_at ?? new Date();
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
      field: 'cashier_id',
      value: store.getters['cashier_session/currentSession'].cashier_id,
    });
    this.$store.commit('sale/SET_REQUEST_FIELD_VALUE', {
      field: 'sale_type_id',
      value: null,
    });
  },
  methods: {
    getFilterSalesList() {
      this.loading = true;
      this.$store
        .dispatch('sale/getSalesList', {
          page: 1,
          field: { ...this.requestField, next: true },
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style scoped></style>
