<template>
  <BaseContainer
    :module="$t('menu.modules.stocks')"
    :title="$t('stocks.title')"
  >
    <div class="card">
      <BaseTableHeader
        :refresh-action-field="{
          page: 1,
          field: { ...requestField, next: true },
        }"
        :title="$t('stocks.shipping.list')"
        add-action-label="stocks.shipping.add"
        add-action-router-name="shipping.form.desc"
        refresh-action-name="shipping/getShippingsList"
        entity="Shipping"
      />
      <div class="card-body pb-0">
        <div class="row">
          <div class="col-md-4">
            <BaseDatetime
              v-model="filterDate"
              :max-date="new Date()"
              :range="true"
              placeholder="Filtrer par date ?"
            />
          </div>
        </div>
        <ShippingTable :shipping-entries="shippings" />
      </div>
      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import ShippingTable from '/@/components/stocks/ShippingTable.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseDatetime from '/@/components/common/BaseDatetime.vue';
export default {
  name: 'ShippingsList',
  components: { BaseTableHeader, BaseContainer, ShippingTable, BaseDatetime },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('shipping/getShippingsList', {
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
  computed: {
    ...mapGetters('shipping', ['shippings', 'shipping', 'requestField']),
    filterDate: {
      get() {
        return this.requestField.created_at;
      },
      set(date) {
        this.$store.commit('shipping/SET_REQUEST_FIELD_VALUE', {
          field: 'created_at',
          value: date,
        });
      },
    },
  },
  created() {
    if (this.shipping)
      this.$store.commit('shipping/SET_CURRENT_SHIPPING', null);
  },
  methods: {
    deleteShipping(shipping) {
      if (confirm(this.$t('messages.confirmDelete', { label: shipping.label })))
        this.$store.dispatch('shipping/deleteShipping', shipping.id);
    },
  },
};
</script>

<style scoped></style>
