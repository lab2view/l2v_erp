<template>
  <BaseContainer
    :module="$t('menu.modules.stocks')"
    :title="$t('stock.title')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('stock.inventory.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'inventory.form' }"
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
        Inventories
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
      .dispatch('inventory/getInventoriesList', {
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
    ...mapGetters('inventory', ['inventories', 'inventory']),
  },
  created() {
    if (this.inventory)
      this.$store.commit('inventory/SET_CURRENT_INVENTORY', null);
  },

  methods: {
    deleteInventory(inventory) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: inventory.label })
        )
      )
        this.$store.dispatch(
          'inventory/deleteInventory',
          inventory.id
        );
    },
  },
};
</script>

<style scoped></style>
