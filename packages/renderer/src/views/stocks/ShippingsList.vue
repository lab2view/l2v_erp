<template>
  <BaseContainer
    :module="$t('menu.modules.stocks')"
    :title="$t('stocks.title')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('stocks.shipping.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'shipping.form' }"
              class="btn btn-primary"
              href="#"
              type="button"
            >
              <i class="fa fa-plus m-r-5" />
              {{ $t('common.add') }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="card-body">
        Shippings
        <br>
        {{  shippings.length }}
      </div>

      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';

export default {
  components: { BaseContainer },
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
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: shipping.label })
        )
      )
        this.$store.dispatch(
          'shipping/deleteShipping',
          shipping.id
        );
    },
  },
};
</script>

<style scoped></style>
