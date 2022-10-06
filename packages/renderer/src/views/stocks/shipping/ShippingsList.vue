<template>
  <BaseContainer
    :title="$t('stocks.title')"
    :module="$t('menu.modules.stocks')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('stocks.shipping.list')"
        add-action-router-name="shipping.form.desc"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="shipping/getShippingsList"
        add-action-label="stocks.shipping.add"
      />
      <div class="card-body pb-0">
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

export default {
  name: 'ShippingsList',
  components: { BaseTableHeader, BaseContainer, ShippingTable },
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
    ...mapGetters('shipping', ['shippings', 'shipping']),
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
